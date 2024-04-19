/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';

import RoleForm from '@/components/role/RoleForm';

import {
   ActionCreateIcon,
   ActionDeleteIcon,
   ActionEditIcon,
} from '@/theme/Icons';

import {
  PersonPropertyType,
  RoleType,
  OperationType,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

// columns
const rowKey = 'id';
let columns: DataTableColumn<RoleType>[] = [
  {
    id: 'quantity',
    label: '#',
    sortable: true,
    filterable: true,
    shrink: true,
    align: 'right',
    content: (data, row) => data + ' x',
  },
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'description',
    label: 'Description',
    display: 'sm',
    sortable: true,
    filterable: true,
  },
  {
    id: 'needsAdminAcceptance',
    label: 'Confirm',
    display: 'sm',
    sortable: true,
    filterable: false,
    content: (data, row) => data ? 'Yes' : 'No',
  },
  {
    id: 'rolespecificationSet',
    label: 'Qualifications',
    display: 'sm',
    sortable: true,
    filterable: false,
    content: (data: RoleType['rolespecificationSet'], row) => <>
      {!!row.mandatory?.length &&
        <Box sx={{ fontSize: 10 }}>
          <b>Mandatory</b>
          <List>
            {row.mandatory.map(property =>
              <ListItem key={property?.id} sx={{ paddingY: 0 }}>
                {property?.group.name} / {property?.name}
              </ListItem>
            )}
          </List>
        </Box>
      }
      {!!row.recommended?.length &&
        <Box sx={{ fontSize: 10 }}>
          <b>Recommended</b>
          <List>
            {row.recommended.map(property =>
              <ListItem key={property?.id} sx={{ paddingY: 0 }}>
                {property?.group.name} / {property?.name}
              </ListItem>
            )}
          </List>
        </Box>
      }
      {!!row.unrecommended?.length &&
        <Box sx={{ fontSize: 10 }}>
          <b>Unrecommended</b>
          <List>
            {row.unrecommended.map(property =>
              <ListItem key={property?.id} sx={{ paddingY: 0 }}>
                {property?.group.name} / {property?.name}
              </ListItem>
            )}
          </List>
        </Box>
      }
      {!!row.impossible?.length &&
        <Box sx={{ fontSize: 10 }}>
          <b>Impossible</b>
          <List>
            {row.impossible.map(property =>
              <ListItem key={property?.id} sx={{ paddingY: 0 }}>
                {property?.group.name} / {property?.name}
              </ListItem>
            )}
          </List>
        </Box>
      }
    </>
  },
]

function RoleTable({
  operation,
  roles,
  setRoles,
  handleChanged,
} : {
  operation: OperationType | "",
  roles: RoleType[],
  setRoles: React.Dispatch<React.SetStateAction<RoleType[]>>,
  handleChanged: (key: string, oldValue: any, newValue: any) => void,
}) {
  // provider
  const dialog = useDialog();

  // states
  const [initialRoles, setInitialRoles] = useState<RoleType[]>([]);

  // actions
  const actions: DataTableActions<RoleType> = [
    {
      name: 'Add',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        dialog.showDialog(
          <RoleForm
            operation={operation}
            onApply={role => {
              let newRoles = structuredClone(roles);
              newRoles.push(role);
              setRoles(newRoles);
              handleChanged('roles', initialRoles, newRoles);
            }}
          />,
          "Add Role"
        )
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 30,
      action: (selected, setSelected, event) => {
        dialog.showDialog(
          <RoleForm
            operation={operation}
            role={selected[0]}
            onApply={role => {
              let newRoles = structuredClone(roles);
              newRoles[roles.indexOf(selected[0])] = role;
              setRoles(newRoles);
              handleChanged('roles', initialRoles, newRoles);
            }}
          />,
          "Edit Role"
        )
      },
      available: (selected) => (selected.length == 1),
      display: {
        row: true,
      }
    },
    {
      name: 'Remove',
      icon: <ActionDeleteIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {
        let newRoles = structuredClone(roles);
        selected.forEach(entry => {
          newRoles.splice(newRoles.findIndex(role => role?.id === entry.id), 1);
        })
        setRoles(newRoles);
        handleChanged('roles', initialRoles, newRoles);
        setSelected([]);
      },
      available: (selected) => (selected.length > 0),
    },
  ];

  // return
  return (
    <DataTable
      columns={columns}
      rows={roles}
      rowKey={rowKey}
      title="Roles"
      filterable={false}
      selectable={true}
      embed={true}
      actions={actions}
    />
  );
}

export default RoleTable;
