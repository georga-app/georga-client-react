import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const ACTIVATE_PERSON = gql`
  mutation ActivatePerson(
    $token: String!
  ) {
    activatePerson(
      input: {
        token: $token
      }
    ) {
      email
      errors {
        field
        messages
      }
    }
  }
`;

function Activate() {
  let navigate = useNavigate();
  let params = useParams();
  const [activated, setActivated] = useState(false);

  const [activatePerson] = useMutation(
    ACTIVATE_PERSON, {
      onCompleted: data => {
        navigate('/login', {
          state: {
            email: data.activatePerson.email
          }
        });
      },
      onError: error => {
        console.log(error)
        navigate('/');
      }
    }
  );
  if (!activated) {
    activatePerson({
      variables: {
        token: params.token
      }
    });
    setActivated(true);
  }
}

export default Activate;
