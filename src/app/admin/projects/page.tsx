/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import HeaderNav from '@/components/shared/HeaderNav';
import ProjectTable from '@/components/project/ProjectTable';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Projects() {
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Projects"
          backUrl="/admin/organizations"
          backLabel="Organizations"
          forwardUrl="/admin/operations"
          forwardLabel="Operations"
        />
        <ProjectTable />
      </>
    />
  );
}

export default Projects;
