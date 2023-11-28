/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { MouseEvent } from "react";
import { ChangeEvent } from "react";

import { alpha } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import { visuallyHidden } from '@mui/utils';

import { ActionClearIcon } from '@/theme/Icons'
import { ActionDeselectIcon } from '@/theme/Icons'
import { ActionFilterIcon } from '@/theme/Icons'
import { ActionMoreIcon } from '@/theme/Icons'
import { ActionSearchIcon } from '@/theme/Icons'
import { ActionSelectIcon } from '@/theme/Icons'

import CatchContextMenu from '@/components/shared/CatchContextMenu';

import PropTypes from 'prop-types';
import { Order } from '@/types/DataTable';
import { DataTableColumn } from '@/types/DataTable';
import { DataTableActions } from '@/types/DataTable';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function DataTableHead<T>({
  numSelected,
  onRequestSort,
  order,
  orderBy,
  rowCount,
  columns,
}: {
  numSelected: number,
  onRequestSort: (event: React.MouseEvent<unknown>,
                  property: keyof T) => void,
  order: Order,
  orderBy: string,
  rowCount: number,
  columns: DataTableColumn<T>[],
}) {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  let timeouts: {[headCellId: string]: ReturnType<typeof setTimeout>} = {}

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell: DataTableColumn<T>) => (
          <TableCell
            key={headCell.id as string}
            align={headCell.align ? headCell.align : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ userSelect: 'none' }}
          >
            {headCell.sortable
              ? <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
            : headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function DataTableToolbarAction({
  icon,
  onClick,
  tooltip = '',
  badge = undefined,
  ariaControls,
  ariaHaspopup,
}: {
  icon: React.ReactNode,
  onClick?: (event: React.MouseEvent<HTMLElement>) => void,
  tooltip?: string,
  badge?: number | undefined,
  ariaControls?: React.ComponentProps<'button'>['aria-controls'],
  ariaHaspopup?: React.ComponentProps<'button'>['aria-haspopup'],
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        aria-controls={ariaControls}
        aria-haspopup={ariaHaspopup}
        onClick={onClick}
        sx={{ marginX: { xs: 1.5, sm: 0.5 }, marginY: { xs: 1, sm: 0.5 } }}
      >
        <Badge badgeContent={badge} color="primary">
          {icon}
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

function DataTableToolbar<T>({
  title = '',
  actions = [],
  availableActions = [],
  selectable = true,
  numSelected = 0,
  getSelectedRows = () => [],
  selectToggleAll = () => undefined,
  filterable = true,
  filter,
  setFilter,
  numVisible,
  numTotal,
}: {
  title?: string,
  actions?: DataTableActions<T>,
  availableActions?: DataTableActions<T>,
  filterable?: boolean,
  selectable?: boolean,
  numSelected: number,
  getSelectedRows?: () => T[],
  selectToggleAll?: (event: React.MouseEvent<HTMLElement>) => void,
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>,
  numVisible: number,
  numTotal: number,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [anchorElActions, setAnchorElActions] = useState<null | HTMLElement>(null);

  // filter
  const filterRef = useRef<HTMLInputElement>(null);
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    const field = filterRef.current;
    if ( !field )
      return;

    const allSelected = (
      filter
      && field.selectionStart == 0
      && field.selectionEnd == field.value.length
    )
    if ( allSelected ) {
      field.blur();
      setFilter('');
      setFilterOpen(false);
    } else {
      field.select();
      field.focus();
      setFilterOpen(true);
    }
  };

  // actions
  let promotedActions: DataTableActions<T> = [];
  let showActionMenu = false;
  if ( Object.keys(actions).length ) {
    const numSlots = 5;
    const numActionSlots = numSlots - Number(filterable) - Number(selectable);
    showActionMenu = availableActions.length > numActionSlots;
    promotedActions = availableActions;
    if ( showActionMenu )
      promotedActions = promotedActions.slice(0, numActionSlots - 1);
  }

  // actions menu
  const handleOpenActionsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElActions(event.currentTarget);
  };
  const handleCloseActionsMenu = () => { setAnchorElActions(null); };

  return (
    <Box
      sx={{
        paddingY: { xs: 0.5, sm: 0.5 },
        paddingX: { xs: 0.5, sm: 2 },
        ...(numSelected > 0 ? {
          bgcolor: 'background.active',
        }: {
          bgcolor: (theme) => {
            return {
              xs: theme.palette.background.default,
              sm: theme.palette.background.brighter,
            }
          },
        }),
        position: { xs: 'fixed', sm: 'unset' },
        bottom: { xs: 0, sm: 'inherit' },
        left: { xs: 0, sm: 'inherit' },
        right: { xs: 0, sm: 'inherit' },
        width: { xs: '100vw', sm: 'inherit' },
        boxShadow: {
          xs: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, '
             +'rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, '
             +'rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
          sm: 'none'
        },
        zIndex: { xs: 1, sm: 'unset' }
      }}
    >
      <Toolbar
        sx={{ px: { xs: 0.5, sm: 0 },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          minHeight: 'unset',
        }}
      >

        {/* title */}
        {title &&
          <Typography
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight: 1 }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        }

        {/* select */}
        {selectable && numSelected
          ? <DataTableToolbarAction
              icon=<ActionDeselectIcon />
              tooltip='Deselect all'
              badge={numSelected}
              onClick={selectToggleAll}
            />
          : <DataTableToolbarAction
              icon=<ActionSelectIcon />
              tooltip='Select all'
              onClick={selectToggleAll}
            />
        }

        {/* filter */}
        {filterable &&
          <DataTableToolbarAction
            icon=<ActionSearchIcon />
            tooltip='Filter list'
            onClick={handleFilterClick}
          />
        }
        <Box
          sx={{
            width: !filterOpen ? 0 : { xs: '100%', sm: '350px' },
            paddingLeft: !filterOpen ? 0 : { xs: 2.5, sm: 0.5 },
            paddingRight: !filterOpen ? 0 : { xs: 1.5, sm: 0.5 },
            paddingBottom: !filterOpen ? 0 : { xs: 1.5, sm: 0.5 },
            paddingTop: !filterOpen ? 0 : { sm: 1.5 },
            order: { xs: 1, sm: 0 },
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <TextField
            id="filter-local-simple"
            size="small"
            variant="standard"
            value={filter}
            onChange={event => setFilter(event.target.value)}
            onBlur={() => !filter && setFilterOpen(false)}
            inputRef={filterRef}
            sx={{ color: '#fff', width: '100%' }}
            InputProps={{
              endAdornment: (
                <Typography
                  variant="caption"
                  sx={{
                    whiteSpace: 'nowrap',
                    margin: '5px',
                    color: 'primary.light',
                  }}
                >{numVisible} / {numTotal}</Typography>
              )
            }}
          />
          <IconButton
            onClick={() => {setFilter(''); setFilterOpen(false)}}
            size="small"
            sx={{
              visibility: filter ? 'visible' : 'hidden',
              paddingTop: { sm: '2px' }
            }}
          >
            <ActionClearIcon />
          </IconButton>
        </Box>

        {/* spacer */}
        <Box flexGrow={1} />

        {/* actions */}
        {promotedActions && promotedActions.map((action, index) =>
          <DataTableToolbarAction
            key={'promoted-action-' + index}
            icon={action.icon}
            tooltip={action.name}
            onClick={event => action.action(getSelectedRows(), event)}
          />
        )}
        {showActionMenu && <>
          <DataTableToolbarAction
            icon=<ActionMoreIcon />
            tooltip='All actions'
            onClick={handleOpenActionsMenu}
            ariaControls="menu-actions"
            ariaHaspopup="true"
          />
          <Menu
            id="menu-actions"
            anchorEl={anchorElActions}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElActions)}
            onClose={handleCloseActionsMenu}
          >
            {availableActions.map((action, index) => [
              index == promotedActions.length && <Divider key='divider' />,
              <MenuItem
                key={'toolbar-available-action-' + index}
                onClick={event => {
                  action.action(getSelectedRows(), event); handleCloseActionsMenu();
                }}
              >
                <Typography textAlign="center">{action.name}</Typography>
              </MenuItem>
            ])}
          </Menu>
        </>}

      </Toolbar>

    </Box>
  );
};

function DataTable<T>({
  columns,
  rows,
  rowKey,
  actions = [],
  title = '',
  elevation = 1,
  header = true,
  filterable = true,
  selectable = true,
}: {
  columns: DataTableColumn<T>[],
  rows: T[],
  rowKey: keyof T,
  actions?: DataTableActions<T>,
  title?: string,
  elevation?: number,
  header?: boolean,
  filterable?: boolean,
  selectable?: boolean,
}) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(rowKey);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [filter, setFilter] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  // sort
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // select
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const numSelected = selected.length;
  const getSelectedRows = () => rows.filter(row => selected.includes(row[rowKey] as string));

  const handleSelectToggleAllClick = (event: React.MouseEvent<HTMLElement>) => {
    if (selected.length > 0) {
      setSelected([]);
      return;
    }
    const newSelected = rows.map(row => row[rowKey] as string);
    setSelected(newSelected);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    if (!selectable)
      return;
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // paging
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // filter
  const filterColumns = columns.filter(column => column.filterable).map(column => column.id);

  // visible
  const visibleRows = useMemo(
    () => {
      const filteredRows = !filter ? rows : rows.reduce((result: typeof rows, row) => {
        filterColumns.every(column => {
          if ( String(row[column]).toLowerCase().includes(filter.toLowerCase()) )
            return result.push(row);
          return true;
        });
        return result;
      }, []);
      return stableSort(filteredRows as Array<any>, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      )},
    [order, orderBy, page, rows, rowsPerPage, filter, filterColumns],
  );
  const numVisible = visibleRows.length;
  const numTotal = rows.length;

  // actions
  const availableActions: DataTableActions<T> = actions
    .filter(x => x.available(getSelectedRows()))
    .sort((x, y) => x.priority - y.priority);

  // context menu
  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };
  const handleContextMenu = (event: React.MouseEvent, name: string) => {
    event.preventDefault();
    if ( selected.length == 0 ) {
      handleClick(event, name);
    }
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={elevation} sx={{ width: '100%', mb: 2 }}>
        <CatchContextMenu>

          {/* toolbar */}
          <DataTableToolbar
            title={title}
            actions={actions}
            availableActions={availableActions}
            selectable={selectable}
            numSelected={numSelected}
            getSelectedRows={getSelectedRows}
            selectToggleAll={handleSelectToggleAllClick}
            filterable={filterable}
            filter={filter}
            setFilter={setFilter}
            numVisible={numVisible}
            numTotal={numTotal}
          />

          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              {/* header */}
              {header &&
                <DataTableHead
                  columns={columns}
                  numSelected={numSelected}
                  order={order}
                  orderBy={orderBy as string}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
              }

              {/* body */}
              <TableBody>
                {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row[rowKey] as string);
                    return (
                      <TableRow
                        hover
                        onClick={(event: React.MouseEvent<HTMLElement>) =>
                                 handleClick(event, row[rowKey] as string)}
                        onContextMenu={(event: React.MouseEvent<HTMLElement>) =>
                                        handleContextMenu(event, row[rowKey] as string)}
                        // onContextMenu={handleContextMenu}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[rowKey] as string}
                        selected={isItemSelected}
                      >
                        {columns.map((column, index) => {
                          let content = row[column.id];
                          return (
                            <TableCell
                              key={column.id as string}
                              sx={{ cursor: 'default' }}
                            >
                              {column.content ? column.content(content) : content as string}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                {visibleRows.length == 0 &&
                  <TableRow style={{ height: (dense ? 33 : 53) * 2 }} >
                    <TableCell colSpan={columns.length} sx={{ textAlign: 'center' }}>
                      No data to display.
                    </TableCell>
                  </TableRow>
                }
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }} >
                    <TableCell colSpan={columns.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* paging */}
          {rowsPerPage > 0 && rows.length > rowsPerPage && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}

          {/* context menu */}
          <Menu
            open={contextMenu !== null}
            onClose={handleCloseContextMenu}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            {availableActions.map((action, index) => (
              <MenuItem
                key={'context-available-action-' + index}
                onClick={event => {
                  action.action(getSelectedRows(), event); handleCloseContextMenu();
                }}
              >
                <Typography textAlign="center">{action.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </CatchContextMenu>
      </Paper>
    </Box>
  );
}

export default DataTable;
