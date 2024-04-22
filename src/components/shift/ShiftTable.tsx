/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs from "dayjs";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import DataTable from '@/components/shared/DataTable';
import { useFilter, filterVariables } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";
import { shiftState } from '@/app/states';

import {
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionNotifyIcon,
  ActionPublishIcon,
  ActionToggleArchiveIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import {
  LIST_SHIFTS_QUERY,
  PUBLISH_SHIFT_MUTATION,
  ARCHIVE_SHIFT_MUTATION,
  DELETE_SHIFT_MUTATION,
} from '@/gql/shift';

import {
  GeorgaShiftStateChoices,
  ShiftType,
  ListShiftsQueryVariables,
} from '@/types/__generated__/graphql';
import { DataTableColumn, DataTableActions } from '@/types/DataTable';

// columns
const rowKey = 'id';
let columns: DataTableColumn<ShiftType>[] = [
  {
    id: 'task',
    label: 'Task',
    display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => data.name,
  },
  {
    id: 'startTime',
    label: 'Start Time',
    sortable: true,
    filterable: true,
    content: (data, row) => String(dayjs(data)),
  },
  {
    id: 'endTime',
    label: 'End Time',
    display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => String(dayjs(data)),
  },
  {
    id: 'state',
    label: '',
    display: 'sm',
    sortable: true,
    filterable: false,
    content: (data, row) => {
      let color = "warning";
      let label = "";
      switch (data) {
        case "PUBLISHED":
          if (dayjs().isBetween(dayjs(row['startTime']), dayjs(row['endTime'])))
            label = "ongoing"
          break;
        case "FINISHED": label = "finished"; color = "success"; break;
        case "CANCELED": label = "canceled"; color = "error"; break;
      }
      return (
        !label ? " " :
          <Chip
            size="small"
            label={label}
            color={color as "success" | "error" | "warning"}
          />
      )
    }
  },
]

function ShiftTable() {
  // provider
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // states
  const [archive, setArchive] = useState(false);

  // list shifts
  const { data, loading } = useQuery(
    LIST_SHIFTS_QUERY, {
      variables: {
        state_In: archive
          ? [GeorgaShiftStateChoices.Archived]
          : [
              GeorgaShiftStateChoices.Draft,
              GeorgaShiftStateChoices.Published,
              GeorgaShiftStateChoices.Finished,
              GeorgaShiftStateChoices.Canceled,
            ],
        ... filterVariables.shift(filter.object)
      }
    }
  );
  let rows: ShiftType[] = [];
  if (!loading && data?.listShifts?.edges)
    rows = data.listShifts.edges
      .map((edge) => edge?.node)
      .filter((node): node is ShiftType => node !== undefined);

  // publish shift
  const [ publishShift, {
    loading: publishShiftLoading,
    reset: publishShiftReset
  }] = useMutation(
    PUBLISH_SHIFT_MUTATION, {
      onCompleted: data => {
        console.log(data)
        const response = data.publishShift;
        if (!response)
          return;
        if(response.errors.length === 0) {
          publishShiftReset();
          snackbar.showSnackbar("Shift publishd", 'success');
        } else {
          publishShiftReset();
          snackbar.showSnackbar("Shift not publishd", 'error');
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListShifts"
      ]
    }
  );

  // archive shift
  const [ archiveShift, {
    loading: archiveShiftLoading,
    reset: archiveShiftReset
  }] = useMutation(
    ARCHIVE_SHIFT_MUTATION, {
      onCompleted: data => {
        const response = data.archiveShift;
        if (!response)
          return;
        if(response.errors.length === 0) {
          archiveShiftReset();
          snackbar.showSnackbar("Shift archived", 'success');
        } else {
          archiveShiftReset();
          snackbar.showSnackbar("Shift not archived", 'error');
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListShifts"
      ]
    }
  );

  // delete shift
  const [ deleteShift, {
    loading: deleteShiftLoading,
    reset: deleteShiftReset
  }] = useMutation(
    DELETE_SHIFT_MUTATION, {
      onCompleted: data => {
        const response = data.deleteShift;
        if (!response)
          return;
        if(response.errors.length === 0) {
          deleteShiftReset();
          snackbar.showSnackbar("Shift deleted", 'success');
        } else {
          deleteShiftReset();
          snackbar.showSnackbar("Shift not deleted", 'error');
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListShifts"
      ]
    }
  );

  // actions
  const actions: DataTableActions<ShiftType> = [
    // TODO: finish, cancel
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        router.push("/admin/shifts/create");
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: archive ? "Close Archive" : "Open Archive",
      icon: archive ? <ActionArchiveIcon /> : <ActionToggleArchiveIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
        setArchive(archive ? false : true);
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 30,
      action: (selected, setSelected, event) => {
        router.push("/admin/shifts/" + selected[0].id + "/edit");
      },
      available: (selected) => (selected.length == 1),
      display: {
        row: true,
      }
    },
    {
      name: 'Publish',
      icon: <ActionPublishIcon />,
      priority: 40,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          publishShift({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => shiftState.sources.PUBLISHED.includes(entry.state))
      ),
      state: {
        transitions: shiftState,
        target: 'PUBLISHED'
      }
    },
    {
      name: 'Archive',
      icon: <ActionArchiveIcon />,
      priority: 50,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          archiveShift({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => shiftState.sources.ARCHIVED.includes(entry.state))
      ),
      state: {
        transitions: shiftState,
        target: 'ARCHIVED'
      }
    },
    {
      name: 'Delete',
      icon: <ActionDeleteIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          deleteShift({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (selected.length > 0),
    },
    {
      name: 'Message',
      icon: <ActionNotifyIcon />,
      priority: 200,
      action: (selected, setSelected, event) => {},
      available: (selected) => (selected.length == 1),
    },
    {
      name: 'Participants',
      icon: <NavigationForwardIcon />,
      priority: 1000,
      action: (selected, setSelected, event) => {
        filter.setFilter(selected[0].id);
        router.push("/admin/participants");
      },
      available: (selected) => (selected.length == 1),
      display: {
        toolbar: false,
        row: true,
      }
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={rowKey}
      actions={actions}
    />
  );
}

export default ShiftTable;
