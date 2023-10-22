/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import AdminLevel from '@/types/AdminLevel'

type MenuItemLink = {
  type: 'link',
  path: string,
  name: string,
  adminLevel?: AdminLevel;
}

type MenuItemDivider = {
  type: 'divider',
  adminLevel?: AdminLevel;
}

type MenuItem = MenuItemLink | MenuItemDivider;

type MenuSlots = {
  main:   MenuItem[],
  user:   MenuItem[],
  admin:  MenuItem[],
  footer: MenuItem[],
}

type Menus = {
  frontend: MenuSlots,
  backend: MenuSlots,
}

export default Menus
