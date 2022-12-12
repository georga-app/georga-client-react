import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

function MainMenu(props) {
  const { notifications } = props;
  return <>
    <MobileMenu />
    <DesktopMenu notifications={notifications} />
  </>;
};

export default MainMenu;
