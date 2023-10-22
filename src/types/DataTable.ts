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
  filter?: React.Dispatch<React.SetStateAction<string>>,
  content?: (content: string | number) => React.ReactNode | string,
}

export type { Order, DataTableColumn };
