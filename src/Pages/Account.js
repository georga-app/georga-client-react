import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';

import Theme from '../Components/Shared/Theme';
import PersonForm from '../Components/Models/PersonForm';

const UPDATE_PERSON = gql`
  mutation UpdatePerson (
    $email: String!,
    $password: String!,
    $firstName: String,
    $lastName: String,
    $mobilePhone: String
  ) {
    registerPerson(
      input: {
        email: $email,
        password: $password,
        firstName: $firstName,
        lastName: $lastName,
        mobilePhone: $mobilePhone
      }
    ) {
      person {
        email
      }
      errors {
        field
        messages
      }
    }
  }
`;

function Account(props) {
  const [errors, setErrors] = useState({});
  const [updatePerson, { loading, reset }] = useMutation(
    UPDATE_PERSON, {
      onCompleted: data => {
        if(data.registerPerson.errors.length === 0) {
          // ?
        } else {
          var fieldErrors = {};
          data.registerPerson.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          reset();
        }
      },
      onError: error => {
        setErrors({form: error.message});
      }
    }
  );

  function handleSubmit(event) {
    event.preventDefault();
    updatePerson({
      variables: {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        mobilePhone: this.state.mobilePhone,
      }
    });
  }

  return (
    <Theme menus={props.menus}>
      <PersonForm
        handleSubmit={handleSubmit}
        loading={loading}
        errors={errors}
        buttonText={loading ? "Registering..." : "Register"}
      />
    </Theme>
  );
}

export default Account;
