/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs from "dayjs";

import { SxProps, Theme } from '@mui/material/styles';

import Box from "@mui/material/Box";

function DateRange({
  start,
  end,
  sx = [],
}: {
  start: string,
  end: string,
  sx?: SxProps<Theme>,
}) {
  const from = dayjs(start);
  const to = dayjs(end);
  if ( from.date() == to.date() )
    return <Box sx={[ ...(Array.isArray(sx) ? sx : [sx]) ]}>
      <Box>{from.format("dd, DD.MM.YY")}</Box>
      <Box>{from.format("HH:mm")} - {to.format("HH:mm")}</Box>
    </Box>
  return <Box sx={[ ...(Array.isArray(sx) ? sx : [sx]) ]}>
    <Box>{from.format("dd, DD.MM.YY HH:mm")}</Box>
    <Box>{to.format("dd, DD.MM.YY HH:mm")}</Box>
  </Box>
}

export { DateRange };
