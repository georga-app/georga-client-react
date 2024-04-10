/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';

import HeaderNav from '@/components/shared/HeaderNav';
import ProjectForm from '@/components/project/ProjectForm';

import TwoColumns from '@/theme/layouts/TwoColumns';

function CreateProject() {
  const router = useRouter();
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Create Project"
          backUrl="/admin/projects"
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
          <ProjectForm onSuccess={(data) => router.push("/admin/projects")} />
        </Paper>
      </>
    />
  );
}

export default CreateProject;
