/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonTable from '@/components/person/PersonTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Persons() {
  return (
    <TwoColumns
      bg='admin'
      left=<></>
      right=<>
        <HeaderNav
          currentLabel="Persons"
          backUrl="/"
          backLabel="Home"
          forwardUrl="/admin/messages"
          forwardLabel="Messages"
        />
        <PersonTable />
      </>
    />
  );
}

export default Persons;
