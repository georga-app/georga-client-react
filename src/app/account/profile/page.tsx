/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import TwoColumns from '@/theme/layouts/TwoColumns';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonProfileForm from '@/components/person/PersonProfileForm';

function Profile() {
  return (
    <TwoColumns
      bg='admin'
      left={
        <></>
      }
      right={
        <>
          <HeaderNav title="Profile" back="/account" />
          <Paper sx= {{ padding: { xs: 2, sm: 5 } }}>
            <PersonProfileForm />
          </Paper>
        </>
      }
    />
  );
}

export default Profile;

