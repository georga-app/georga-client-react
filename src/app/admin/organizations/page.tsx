/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import OrganizationTable from '@/components/organization/OrganizationTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Organizations() {
  return <>
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Organizations"
          backUrl="/"
          backLabel="Home"
          forwardUrl="/admin/projects"
          forwardLabel="Projects"
        />
        <OrganizationTable />
      </>
    />
  </>;
}

export default Organizations;
