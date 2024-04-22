/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
// import 'dayjs/locale/de'
dayjs.extend(isBetween)

import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function LocalizationProvider({
  children,
} : {
  children: React.ReactNode,
}) {
  // dayjs.locale('de')
  return (
    <MuiLocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      {children}
    </MuiLocalizationProvider>
  );
}

export { LocalizationProvider };
