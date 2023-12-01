/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import HeaderNav from '@/components/shared/HeaderNav';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Operations() {
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Operations"
          backUrl="/admin/projects"
          backLabel="Projects"
          forwardUrl="/admin/tasks"
          forwardLabel="Tasks"
        />
        Operations
      </>
    />
  );
}

export default Operations;
