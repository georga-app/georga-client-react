/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import TwoColumns from '@/theme/layouts/TwoColumns';

import HeaderNav from '@/components/shared/HeaderNav';

function Security() {
  return (
    <TwoColumns
      bg='admin'
      right=<>
        <HeaderNav
          currentLabel="Security"
          backUrl="/account"
        />
        <p>Security</p>
      </>
    />
  );
}

export default Security;

