/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import ThreeColumns from '@/theme/layouts/ThreeColumns';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonProfileForm from '@/components/person/PersonProfileForm';

function Profile() {
  return (
    <ThreeColumns
      bg='admin'
      left={
        <></>
      }
      middle={
        <>
          <HeaderNav title="Profile" back="/account" />
          <Paper sx= {{ padding: { xs: 2, sm: 5 } }}>
            <PersonProfileForm />
          </Paper>
        </>
      }
      right={
        <></>
      }
    />
  );
}

export default Profile;

