/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import OperationForm from '@/components/operation/OperationForm';

import TwoColumns from '@/theme/layouts/TwoColumns';

function EditOperation({
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
          currentLabel="Edit Operation"
          backUrl="/admin/operations"
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
          <OperationForm
            id={params.id}
            onSuccess={(data) => router.push("/admin/operations")}
          />
        </Paper>
      </>
    />
  );
}

export default EditOperation;
