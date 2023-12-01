/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import HeaderNav from '@/components/shared/HeaderNav';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Shifts() {
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Shifts"
          backUrl="/admin/tasks"
          backLabel="Tasks"
          forwardUrl="/admin/participants"
          forwardLabel="Participants"
        />
        Shifts
      </>
    />
  );
}

export default Shifts;
