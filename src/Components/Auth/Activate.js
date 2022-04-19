import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const ACTIVATE_PERSON = gql`
  mutation ActivatePerson(
    $token: String!
  ) {
    activatePerson(
      token: $token
    ) {
      person {
        username
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
            email: data.activatePerson.person.username
          }
        });
      },
      onError: error => {
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
