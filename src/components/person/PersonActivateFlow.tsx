/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client';
import { gql } from '@/types/__generated__/gql';

const ACTIVATE_PERSON_MUTATION = gql(`
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
`);

function PersonActivateFlow({
  token
}: {
  token: string
}) {
  const router = useRouter();
  const [activated, setActivated] = useState(false);

  const [activatePerson] = useMutation(
    ACTIVATE_PERSON_MUTATION, {
      onCompleted: data => {
        const email = new URLSearchParams({
          email: data.activatePerson?.email || ''
        }).toString();
        router.push('/login?' + email)
      },
      onError: error => {
        console.log(error)
        router.push('/');
      }
    }
  );
  if (!activated) {
    activatePerson({
      variables: {
        token: token
      }
    });
    setActivated(true);
  }
  return <></>;
}

export default PersonActivateFlow;
