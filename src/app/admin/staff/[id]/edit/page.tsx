/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonStaffForm from '@/components/person/PersonStaffForm';

import TwoColumns from '@/theme/layouts/TwoColumns';

function EditStaff({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter();
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Edit Staff"
          backUrl="/admin/staff"
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
          <PersonStaffForm
            id={params.id}
            onSuccess={() => router.push("/admin/staff")}
          />
        </Paper>
      </>
    />
  );
}

export default EditStaff;
