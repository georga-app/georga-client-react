'use client';

import PersonActivateFlow from '@/components/person/ActivateFlow';

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
