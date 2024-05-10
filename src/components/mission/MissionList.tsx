/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs, { Dayjs } from "dayjs";

import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

import { useFilter } from '@/provider/Filter';
import { useSnackbar } from '@/provider/Snackbar';
import {
  formatDateTime,
  formatDate,
  formatDateShort,
  formatDateLong,
  formatDay,
  formatTime,
  formatYear,
  formatYearLong,
} from '@/app/utils'

import { ActionAcceptIcon, ActionDeclineIcon } from '@/theme/Icons';

import { LIST_MISSIONS_QUERY } from '@/gql/mission';

import {
  ShiftType,
  RoleType,
  GeorgaShiftStateChoices,
} from '@/types/__generated__/graphql';
import { onlyType } from "@/types/Util";

type ProcessedShiftType = ShiftType & {
  start: Dayjs,
  end: Dayjs,
  deadline: Dayjs,
  newWeek: boolean,
  newDay: boolean,
  lastDay: boolean,
  newYear: boolean,
}

function MissionList() {
  // provider
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // states
  const [shifts, setShifts] = useState<ProcessedShiftType[]>([]);

  // list missions
  const { data, loading } = useQuery(
    LIST_MISSIONS_QUERY, {
      variables: {
        state_In: [GeorgaShiftStateChoices.Published],
        organization: filter.getOrganization(),
      },
      onCompleted: data => {
        if (!data?.listShifts?.edges)
          return;
        let shifts: ProcessedShiftType[] = data.listShifts.edges
          .map((edge) => structuredClone(edge?.node))
          .filter((node): node is ProcessedShiftType => node !== undefined);
        shifts.forEach(shift => {
          shift.start = dayjs(shift.startTime);
          shift.end = dayjs(shift.endTime);
          shift.deadline = dayjs(shift.enrollmentDeadline);
        })
        shifts.sort((a, b) => a.start.valueOf() - b.start.valueOf());
        let lastShift: ProcessedShiftType = shifts[0];
        shifts.forEach(shift => {
          shift.lastDay = false;
          shift.newDay = false;
          if (lastShift.start.date() < shift.start.date())
            shift.newDay = true;
            lastShift.lastDay = true;
          shift.newWeek = false;
          if (lastShift.start.week() < shift.start.week())
            shift.newWeek = true;
          shift.newYear = false;
          if (lastShift.start.year() < shift.start.year())
            shift.newYear = true;
          lastShift = shift;
        })
        shifts[0].newDay = true;
        shifts[0].newWeek = true;
        shifts[0].newYear = true;
        setShifts(shifts);
      }
    }
  );

  // return
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {shifts.map((shift, index) => {
          let roleSet = shift.task.roleSet;
          if (!!shift.roleSet.edges.length)
            roleSet = shift.roleSet;
          const roles = roleSet.edges
            .map((edge) => structuredClone(edge?.node))
            .filter((node): node is RoleType => node !== undefined);
          return (
            <Fragment key={shift.id}>

              {/* Year */}
              {shift.newYear && shift.start.year() != dayjs().year() && <>
                <Grid xs={12} sm={2}>
                  <Box sx={{
                    backgroundColor: 'primary.dark',
                    color: '#abb',
                    paddingX: 1,
                    paddingTop: 0.5,
                    marginTop: 2,
                    textAlign: 'right',
                  }}>
                    {formatYearLong(shift.start)}
                  </Box>
                </Grid>
                <Grid xs={0} sm={10} />
              </>}

              {/* KW */}
              {shift.newWeek && <>
                <Grid xs={12} sm={2}>
                  <Box sx={{
                    backgroundColor: 'primary.main',
                    color: '#abb',
                    paddingX: 1,
                    paddingTop: 0.5,
                    textAlign: 'right',
                  }}>
                    KW {shift.start.week()}
                  </Box>
                </Grid>
                <Grid xs={0} sm={10} />
              </>}

              {/* Day */}
              {shift.newDay && <>
                <Grid xs={12} sm={2}>
                  <Box sx={{
                    backgroundColor: 'primary.light',
                    color: '#eee',
                    paddingX: 1,
                    paddingTop: 0.5,
                  }}>
                    <b>{formatDateShort(shift.start)}</b>
                    <Box sx={{ float: 'right', color: '#abb' }}>
                      {formatDay(shift.start)}
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={0} sm={10} />
              </>}

              <Grid xs={12}>
                <Paper sx={{
                  color: '#444',
                  backgroundColor: '#fdfefe',
                  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.1),'
                            +'0px 1px 1px 0px rgba(0,0,0,0.07),'
                            +'0px 1px 3px 0px rgba(0,0,0,0.06)',
                }}>
                  <Grid container spacing={0}>

                    {/* Time */}
                    <Grid xs={2}>
                      <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        minHeight: '100%',
                        backgroundColor: '#f8f8f8',
                        paddingX: 1,
                      }}>
                        <Tooltip
                          title={"Deadline: " + formatDateTime(shift.deadline)}
                        >
                          <Box sx={{ display: 'flex' }}>
                            <Box>
                              {formatTime(shift.start)}
                            </Box>
                            <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                              &nbsp;-&nbsp;
                            </Box>
                            <Box sx={{ display: { xs: 'block', sm: 'inline' }, color: '#999' }}>
                              {formatTime(shift.end)}
                            </Box>
                          </Box>
                        </Tooltip>
                      </Box>
                    </Grid>

                    {/* Mission */}
                    <Grid xs={10}>
                      <Box sx={{ display: 'flex', paddingX: 1 }}>

                        {/* Location */}
                        <Box sx={{
                          flexGrow: 1,
                          marginY: 2,
                          display: { xs: 'none', sm: 'block' },
                          minHeight: '100%',
                          alignContent: 'center',
                        }}>
                          City
                        </Box>

                        {/* Task */}
                        <Box sx={{
                          flexGrow: 1,
                          marginY: 2,
                          display: { xs: 'none', sm: 'block' },
                          minHeight: '100%',
                          alignContent: 'center',
                        }}>
                          <Tooltip
                            title=<>
                              <table style={{ textAlign: 'left' }}>
                                <tbody>
                                  <tr>
                                    <th style={{ verticalAlign: 'top' }}>Organization</th>
                                    <td>{shift.task.operation.project.organization.name}</td>
                                  </tr>
                                  <tr>
                                    <th style={{ verticalAlign: 'top' }}>Project</th>
                                    <td>{shift.task.operation.project.name}</td>
                                  </tr>
                                  <tr>
                                    <th style={{ verticalAlign: 'top' }}>Operation</th>
                                    <td>{shift.task.operation.name}</td>
                                  </tr>
                                  <tr>
                                    <th style={{ verticalAlign: 'top' }}>Task</th>
                                    <td>{shift.task.name}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </>
                          >
                            <Box>
                              <Box sx={{ color: '#999' }}>
                                {shift.task.field.name}
                              </Box>
                              <Box>
                                {shift.task.name}
                              </Box>
                            </Box>
                          </Tooltip>
                        </Box>

                        {/* Roles */}
                        <Box sx={{
                          flexGrow: 1,
                          marginY: 2,
                          minHeight: '100%',
                          alignContent: 'center',
                        }}>
                          {roles[0].name}
                        </Box>

                        {/* Actions */}
                        <Box sx={{
                          flexShrink: 1,
                          minHeight: '100%',
                          alignContent: 'center',
                          marginRight: 1,
                        }}>

                          <Tooltip title="Accept">
                            <IconButton
                              // aria-controls={ariaControls}
                              // aria-haspopup={ariaHaspopup}
                              // onClick={onClick}
                              sx={{
                                  marginX: { xs: 1.5, sm: 0.5 },
                                  marginY: { xs: 1, sm: 0.5 },
                              }}
                            >
                              <ActionAcceptIcon sx={{
                                color: 'success.main',
                                fontSize: '35px',
                              }}/>
                            </IconButton>
                          </Tooltip>
                        </Box>

                      </Box>
                    </Grid>

                  </Grid>
                </Paper>
              </Grid>

            </Fragment>
          )
        })}
      </Grid>
    </Box>
  )
}

export default MissionList;
