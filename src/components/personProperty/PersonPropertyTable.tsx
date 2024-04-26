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

import PersonPropertyForm from '@/components/personProperty/PersonPropertyForm';

import {
   ActionCreateIcon,
   ActionDeleteIcon,
   ActionEditIcon,
} from '@/theme/Icons';

import {
  PersonPropertyType,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

// columns
const rowKey = 'id';
let columns: DataTableColumn<PersonPropertyType>[] = [
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
  },
]

function PersonPropertyTable({
  groupId,
  personProperties,
  setPersonProperties,
  handleChanged,
  override,
  setOverride,
  title = '',
} : {
  groupId: string,
  personProperties: PersonPropertyType[],
  setPersonProperties: React.Dispatch<React.SetStateAction<PersonPropertyType[]>>,
  handleChanged: (key: string, oldValue: any, newValue: any) => void,
  override?: boolean,
  setOverride?: React.Dispatch<React.SetStateAction<boolean>>,
  title?: string,
}) {
  // provider
  const dialog = useDialog();

  // states
  const [initialPersonProperties, setInitialPersonProperties] =
    useState<PersonPropertyType[]>([]);

  // actions
  const actions: DataTableActions<PersonPropertyType> = [
    {
      name: 'Add',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        dialog.showDialog(
          <PersonPropertyForm
            groupId={groupId}
            onApply={personProperty => {
              let newPersonProperties = structuredClone(personProperties);
              newPersonProperties.push(personProperty);
              setPersonProperties(newPersonProperties);
              handleChanged('roles', initialPersonProperties, newPersonProperties);
            }}
          />,
          "Add Choice"
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
          <PersonPropertyForm
            groupId={groupId}
            personProperty={selected[0]}
            onApply={personProperty => {
              let newPersonProperties = structuredClone(personProperties);
              newPersonProperties[personProperties.indexOf(selected[0])] = personProperty;
              setPersonProperties(newPersonProperties);
              handleChanged('roles', initialPersonProperties, newPersonProperties);
            }}
          />,
          "Edit Choice"
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
        let newPersonProperties = structuredClone(personProperties);
        selected.forEach(entry => {
          newPersonProperties.splice(
            newPersonProperties.findIndex(role => role?.id === entry.id), 1);
        })
        setPersonProperties(newPersonProperties);
        handleChanged('roles', initialPersonProperties, newPersonProperties);
        setSelected([]);
      },
      available: (selected) => (selected.length > 0),
    },
  ];

  // return
  return (
    <DataTable
      columns={columns}
      rows={personProperties}
      rowKey={rowKey}
      title={title}
      filterable={false}
      selectable={(!!setOverride && !override) ? false : true}
      embed={true}
      actions={actions}
    />
  );
}

export default PersonPropertyTable;
