/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonStaffTable from '@/components/person/PersonStaffTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Staff() {
  return (
    <TwoColumns
      bg='admin'
      left=<></>
      right=<>
        <HeaderNav
          currentLabel="Staff"
          backUrl="/"
          backLabel="Home"
        />
        <PersonStaffTable />
      </>
    />
  );
}

export default Staff;
