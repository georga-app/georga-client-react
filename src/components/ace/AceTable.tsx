/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';

import AceForm from '@/components/ace/AceForm';

import {
   ActionCreateIcon,
   ActionDeleteIcon,
   ActionEditIcon,
} from '@/theme/Icons';

import {
  AceType,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

// columns
const rowKey = 'id';
let columns: DataTableColumn<AceType>[] = [
  {
    id: 'instance',
    label: 'Object',
    sortable: true,
    filterable: true,
    content: (data, row) => {
      let object = ""
      switch (row.instance.__typename) {
        case "OrganizationType":
          object = "Organization"; break;
        case "ProjectType":
          object = "Project"; break;
        case "OperationType":
          object = "Operation"; break;
      }
      return <>
        <Typography sx={{ color: "#888", fontSize: 12 }}>{object}</Typography>
        <Typography>{data.name}</Typography>
      </>
    },
  },
  {
    id: 'permission',
    label: 'Right',
    sortable: true,
    filterable: true,
    shrink: true,
    content: (data, row) => (
      <Chip
        size="small"
        label={data.toLowerCase()}
        color="success"
      />
    )
  },
]

function AceTable({
  personId,
  organizationId,
  aces,
  setAces,
  handleChanged,
  title = '',
} : {
  personId: string,
  organizationId: string,
  aces: AceType[],
  setAces: React.Dispatch<React.SetStateAction<AceType[]>>,
  handleChanged: (key: string, oldValue: any, newValue: any) => void,
  title?: string,
}) {
  // provider
  const dialog = useDialog();

  // states
  const [initialAces, setInitialAces] = useState<AceType[]>([]);

  // actions
  const actions: DataTableActions<AceType> = [
    {
      name: 'Add',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        dialog.showDialog(
          <AceForm
            personId={personId}
            organizationId={organizationId}
            ace={selected[0]}
            onApply={ace => {
              const duplicate = aces.filter(oldAce =>
                oldAce.instance.id === ace.instance.id
                && oldAce.permission === ace.permission
              )
              if (!!duplicate.length)
                return;
              let newAce = structuredClone(aces);
              newAce.push(ace);
              setAces(newAce);
              handleChanged('roles', initialAces, newAce);
            }}
          />,
          "Add Permission"
        )
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Remove',
      icon: <ActionDeleteIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {
        let newAces = structuredClone(aces);
        selected.forEach(entry => {
          newAces.splice(newAces.findIndex(ace => ace?.id === entry.id), 1);
        })
        setAces(newAces);
        handleChanged('aces', initialAces, newAces);
        setSelected([]);
      },
      available: (selected) => (selected.length > 0),
      display: {
        row: true,
      }
    },
  ];

  // return
  return (
    <DataTable
      columns={columns}
      rows={aces}
      rowKey={rowKey}
      title={title}
      filterable={false}
      selectable={true}
      embed={true}
      actions={actions}
    />
  );
}

export default AceTable;
