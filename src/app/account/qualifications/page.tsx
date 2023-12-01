/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client'

import { useState } from "react";

import TwoColumns from '@/theme/layouts/TwoColumns';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonPropertiesForm from '@/components/person/PersonPropertiesForm';
import OrganizationSubscribedSelect from '@/components/organization/OrganizationSubscribedSelect';

function Qualifications() {
  const [organizationId, setOrganizationId] = useState('');

  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Qualifications"
          backUrl="/account"
        />
        <Paper sx= {{
          paddingX: { xs: 2, sm: 5 },
          paddingY: { xs: 2, sm: 2 },
          backgroundColor: 'background.brighter',
          borderRadius: '4px 4px 0 0'
        }}>
          <OrganizationSubscribedSelect
            organizationId={organizationId}
            setOrganizationId={setOrganizationId}
          />
        </Paper>
        <Paper sx= {{
          padding: { xs: 2, sm: 5 },
          borderRadius: '0 0 4px 4px'
        }}>
          <PersonPropertiesForm organizationId={organizationId} />
        </Paper>
      </>
    />
  );
}

export default Qualifications;

