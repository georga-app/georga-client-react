/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import TaskForm from '@/components/task/TaskForm';

import TwoColumns from '@/theme/layouts/TwoColumns';

function EditTask({
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
          currentLabel="Edit Task"
          backUrl="/admin/tasks"
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
          <TaskForm
            id={params.id}
            onSuccess={(data) => router.push("/admin/tasks")}
          />
        </Paper>
      </>
    />
  );
}

export default EditTask;
