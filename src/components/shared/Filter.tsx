/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import Link from 'next/link';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { useFilter } from '@/provider/Filter';

import { ActionCloseIcon } from '@/theme/Icons';

import {
  FilterObjectType,
  isOrganization,
  isProject,
  isOperation,
  isTask,
  isShift,
} from '@/types/Filter';
import {
  OrganizationType,
  ProjectType,
  OperationType,
  TaskType,
  ShiftType
} from '@/types/__generated__/graphql'

function OrganizationInfo({ organization }: { organization: OrganizationType }) {
  return <>
    <Link
      href={'/admin/organizations'}
      aria-label="organizations"
      style={{ textDecoration: 'none' }}
    >
      <Box>
        <Typography variant="caption" sx={{ color: '#666' }}>
          Organization
        </Typography>
        <Typography variant="body1" sx={{ color: 'primary.dark' }}>
          {organization.name}
        </Typography>
      </Box>
    </Link>
    {organization.description && <>
      <Divider sx={{ marginY: 1.5 }} />
      <Typography variant="body2" sx={{ fontSize: '12px', color: '#999' }}>
        {organization.description}
      </Typography>
    </>}
  </>
}

function ProjectInfo({ project }: { project: ProjectType }) {
  return "Project";
}

function OperationInfo({ operation }: { operation: OperationType }) {
  return "Operation";
}

function TaskInfo({ task }: { task: TaskType }) {
  return "Task";
}

function ShiftInfo({ shift }: { shift: ShiftType }) {
  return "Shift";
}

function ObjectInfo({ object }: { object: FilterObjectType }) {
  if ( isOrganization(object) )
    return <OrganizationInfo organization={object} />;
  if ( isProject(object) )
    return <ProjectInfo project={object} />;
  if ( isOperation(object) )
    return <OperationInfo operation={object} />;
  if ( isTask(object) )
    return <TaskInfo task={object} />;
  if ( isShift(object) )
    return <ShiftInfo shift={object} />;
  return <></>;
}

function Filter() {
  const filter = useFilter();
  const theme = useTheme();
  if ( !filter.object )
    return <></>;
  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: 'background.brighter',
        marginRight: 1,
        marginTop: '54px',
        paddingX: 2,
        paddingY: 2,
        textAlign: 'left',
        position: 'relative',
      }}
    >
      <IconButton
        aria-label="remove filter"
        onClick={() => filter.unsetFilter()}
        sx={{
          position: 'absolute',
          right: 4,
          top: 5,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <ActionCloseIcon />
      </IconButton>
      <ObjectInfo object={filter.object} />
    </Paper>
  );
}

export default Filter;