/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import PersonPropertyGroupForm from '@/components/personPropertyGroup/PersonPropertyGroupForm';

import TwoColumns from '@/theme/layouts/TwoColumns';

function EditQualification({
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
          currentLabel="Edit Qualification"
          backUrl="/admin/qualifications"
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
          <PersonPropertyGroupForm
            id={params.id}
            onSuccess={(data) => router.push("/admin/qualifications")}
          />
        </Paper>
      </>
    />
  );
}

export default EditQualification;
