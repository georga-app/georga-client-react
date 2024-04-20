/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import ShiftForm from '@/components/shift/ShiftForm';

import TwoColumns from '@/theme/layouts/TwoColumns';

function CreateShift() {
  const router = useRouter();
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Create Shift"
          backUrl="/admin/shifts"
          backLabel="List"
        />
        <Paper
          elevation={2}
          sx={{
            padding: 2,
            marginX: {
              xs: 1,
              md: "auto"
            },
          }}
        >
          <ShiftForm onSuccess={(data) => router.push("/admin/shifts")} />
        </Paper>
      </>
    />
  );
}

export default CreateShift;
