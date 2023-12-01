/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import HeaderNav from '@/components/shared/HeaderNav';

import TwoColumns from '@/theme/layouts/TwoColumns';

function Participants() {
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Participants"
          backUrl="/admin/shifts"
          backLabel="Shifts"
        />
        Participants
      </>
    />
  );
}

export default Participants;
