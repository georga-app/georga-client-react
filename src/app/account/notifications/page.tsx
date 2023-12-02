/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import TwoColumns from '@/theme/layouts/TwoColumns';

import HeaderNav from '@/components/shared/HeaderNav';

function Notifications() {
  return (
    <TwoColumns
      bg='admin'
      left=<></>
      right=<>
        <HeaderNav
          currentLabel="Notifications"
          backUrl="/account"
        />
        <p>Notifications</p>
      </>
    />
  );
}

export default Notifications;

