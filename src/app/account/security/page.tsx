/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import ThreeColumns from '@/theme/layouts/ThreeColumns';
import HeaderNav from '@/components/shared/HeaderNav';

function Security() {
  return (
    <ThreeColumns
      bg='admin'
      left={
        <></>
      }
      middle={
        <>
          <HeaderNav title="Security" back="/account" />
          <p>Security</p>
        </>
      }
      right={
        <></>
      }
    />
  );
}

export default Security;

