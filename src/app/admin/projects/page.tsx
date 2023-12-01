/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import HeaderNav from '@/components/shared/HeaderNav';

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
        Projects
      </>
    />
  );
}

export default Projects;
