/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import Link, { LinkProps } from "next/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { useFilter } from '@/provider/Filter';

import { ActionCloseIcon } from '@/theme/Icons';

import { FilterObjectType } from '@/types/Filter';


function Info({
  label,
  content,
  url,
  active=false,
  divider=true,
}: {
  label: string,
  content: React.ReactNode,
  url: LinkProps['href'],
  active?: boolean,
  divider?: boolean,
}) {
  return <>
    {divider && active && <Divider sx={{ marginY: 1.5 }} />}
    <Link
      href={url}
      aria-label={label}
      style={{ textDecoration: 'none', marginBottom: 1 }}
    >
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="caption" sx={{ color: active ? 'secondary.light' : '#aaa' }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ color: active ? 'primary.main' : '#888' }}>
          {content}
        </Typography>
      </Box>
    </Link>
  </>;
}

function Description({ content }: { content: string }) {
  return content && <>
    <Typography variant="body2" sx={{ fontSize: '12px', color: '#999', marginTop: 2 }}>
      {content}
    </Typography>
  </>;
}

function ObjectInfo({ object }: { object: FilterObjectType }) {
  switch ( object?.__typename ) {

    case "OrganizationType":
      return <>
        <Info
          label="Organization"
          content={object.name}
          url="/admin/organizations"
          active={true}
          divider={false}
        />
        <Description content={object.description || ""} />
      </>;

    case "ProjectType":
      return <>
        <Info
          label="Organization"
          content={object.organization.name}
          url="/admin/organizations"
        />
        <Info
          label="Project"
          content={object.name}
          url="/admin/projects"
          active={true}
        />
        <Description content={object.description || ""} />
      </>;

    case "OperationType":
      return <>
        <Info
          label="Organization"
          content={object.project.organization.name}
          url="/admin/organizations"
        />
        <Info
          label="Project"
          content={object.project.name}
          url="/admin/projects"
        />
        <Info
          label="Operation"
          content={object.name}
          url="/admin/operations"
          active={true}
        />
        <Description content={object.description || ""} />
      </>;

    case "TaskType":
      return <>
        <Info
          label="Organization"
          content={object.operation.project.organization.name}
          url="/admin/organizations"
        />
        <Info
          label="Project"
          content={object.operation.project.name}
          url="/admin/projects"
        />
        <Info
          label="Operation"
          content={object.operation.name}
          url="/admin/operations"
        />
        <Info
          label="Task"
          content={object.name}
          url="/admin/tasks"
          active={true}
        />
        <Description content={object.description || ""} />
      </>;

    case "ShiftType":
      return <>
        <Info
          label="Organization"
          content={object.task.operation.project.organization.name}
          url="/admin/organizations"
        />
        <Info
          label="Project"
          content={object.task.operation.project.name}
          url="/admin/projects"
        />
        <Info
          label="Operation"
          content={object.task.operation.name}
          url="/admin/operations"
        />
        <Info
          label="Task"
          content={object.task.name}
          url="/admin/tasks"
        />
        <Info
          label="Shift"
          content=<>
            {new Date(object.startTime).toLocaleString()}
            -
            {new Date(object.shiftEndTime).toLocaleString()}
          </>
          url="/admin/shifts"
          active={true}
        />
      </>;
  }
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
        backgroundColor: 'background.bright',
        border: '1px dashed',
        borderColor: 'secondary.light',
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
