/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import PersonActivateFlow from '@/components/person/PersonActivateFlow';

function Activate({
  params
}: {
  params: { token: string }
}) {
  return (
    <PersonActivateFlow token={params.token}/>
  );
}

export default Activate;
