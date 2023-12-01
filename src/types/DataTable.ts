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
  grow?: boolean,
  sortable?: boolean,
  filterable?: boolean,
  content?: (data: T[keyof T], row: T) => React.ReactNode,
}

type DataTableAction<T> = {
  name: string,
  icon: React.ReactNode,
  priority: number,
  action: (rows: T[], event: React.MouseEvent<HTMLElement>) => void,
  available?: (rows: T[]) => boolean,
  display?: {
    row?: boolean,
    toolbar?: boolean,
    context?: boolean,
  }
  state?: {
    transitions: {
      key: string,
      sources: { [source: string]: string[] },
      targets: { [source: string]: string[] },
    },
    target: string,
  }
}

type DataTableActions<T> = DataTableAction<T>[]

export type { Order, DataTableColumn, DataTableAction, DataTableActions };
