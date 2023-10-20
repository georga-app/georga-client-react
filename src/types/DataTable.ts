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
