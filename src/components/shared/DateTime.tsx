/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import { SxProps, Theme } from '@mui/material/styles';

import { formatDateTime, formatDate, formatTime } from "@/app/utils";

function DateRange({
  start,
  end,
  sx = [],
}: {
  start: string,
  end: string,
  sx?: SxProps<Theme>,
}) {
  if ( dayjs(start).date() == dayjs(end).date() )
    return <Box sx={[ ...(Array.isArray(sx) ? sx : [sx]) ]}>
      <Box>{formatDate(start)}</Box>
      <Box>{formatTime(start)} - {formatTime(end)}</Box>
    </Box>
  return <Box sx={[ ...(Array.isArray(sx) ? sx : [sx]) ]}>
    <Box>{formatDateTime(start)}</Box>
    <Box>{formatDateTime(end)}</Box>
  </Box>
}

function DateTime({
  datetime,
  sx = [],
}: {
  datetime: string,
  sx?: SxProps<Theme>,
}) {
  return <Box sx={[ ...(Array.isArray(sx) ? sx : [sx]) ]}>
    <Box>{formatDateTime(datetime)}</Box>
  </Box>
}

export { DateRange, DateTime };
