/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import ThreeColumns from '@/theme/layouts/ThreeColumns';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonOrganizationsTable from '@/components/person/OrganizationsTable';

function Organizations() {
  return (
    <ThreeColumns
      bg='admin'
      left={
        <></>
      }
      middle={
        <>
          <HeaderNav title="Organizations" back="/account" />
          <PersonOrganizationsTable />
        </>
      }
      right={
        <></>
      }
    />
  );
}

export default Organizations;

