type Order = 'asc' | 'desc';

interface DataTableHeadCell<T> {
  disablePadding: boolean,
  id: keyof T,
  label: string,
  numeric: boolean,
  filter?: React.Dispatch<React.SetStateAction<string>>,
}

export type { Order, DataTableHeadCell };
