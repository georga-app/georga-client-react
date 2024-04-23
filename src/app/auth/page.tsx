/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import PersonAuthFlow from '@/components/person/PersonAuthFlow';

function Auth({
  params
}: {
  params: { token: string }
}) {
  return (
    <PersonAuthFlow />
  );
}

export default Auth;
