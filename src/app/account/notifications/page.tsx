/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import ThreeColumns from '@/theme/layouts/ThreeColumns';
import HeaderNav from '@/components/shared/HeaderNav';

function Notifications() {
  return (
    <ThreeColumns
      bg='admin'
      left={
        <></>
      }
      middle={
        <>
          <HeaderNav title="Notifications" back="/account" />
          <p>Notifications</p>
        </>
      }
      right={
        <></>
      }
    />
  );
}

export default Notifications;

