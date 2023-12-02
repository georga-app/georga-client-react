/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import ParticipantTable from '@/components/participant/ParticipantTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Participants() {
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Participants"
          backUrl="/admin/shifts"
          backLabel="Shifts"
        />
        <ParticipantTable />
      </>
    />
  );
}

export default Participants;
