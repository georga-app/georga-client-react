/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
type Order = 'asc' | 'desc';

interface DataTableColumn<T> {
  disablePadding?: boolean,
  id: keyof T,
  label: string,
  align?: "center" | "left" | "right" | "inherit" | "justify" | undefined,
  sortable?: boolean,
  filterable?: boolean,
  content?: (content: string | number) => React.ReactNode | string,
}

type DataTableAction<T> = {
  name: string,
  icon: React.ReactNode,
  priority: number,
  action: (rows: T[], event: React.MouseEvent<HTMLElement>) => void,
  available: (rows: T[]) => boolean,
}

type DataTableActions<T> = DataTableAction<T>[]

export type { Order, DataTableColumn, DataTableAction, DataTableActions };
