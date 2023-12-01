/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import TwoColumns from '@/theme/layouts/TwoColumns';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import OrganizationSubscribedTable from '@/components/organization/OrganizationSubscribedTable';

function Organizations() {
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Organizations"
          backUrl="/account"
        />
        <OrganizationSubscribedTable />
      </>
    />
  );
}

export default Organizations;

