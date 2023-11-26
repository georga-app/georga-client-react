/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import TwoColumns from '@/theme/layouts/TwoColumns';
import OrganizationTable from '@/components/organization/OrganizationTable';

function Organizations() {
  return (
    <TwoColumns
      bg='admin'
      left={
        <></>
      }
      right={
        <OrganizationTable />
      }
    />
  );
}

export default Organizations;
