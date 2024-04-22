/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from "@mui/material/Chip";
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from '@mui/material/styles';

import { useSnackbar } from "@/provider/Snackbar";
import { participantAdminAcceptance } from '@/app/states';

import {
  ActionAcceptIcon,
  ActionDeclineIcon,
} from '@/theme/Icons';

import {
  GET_PARTICIPANT_QUERY,
  ADMIN_ACCEPT_PARTICIPANT_MUTATION,
  ADMIN_DECLINE_PARTICIPANT_MUTATION,
} from '@/gql/participant';

import {
  ParticipantType,
} from '@/types/__generated__/graphql';
import { onlyType } from "@/types/Util";

function AcceptanceState({
  state,
  sx = [],
}: {
  state: ParticipantType['acceptance'] | ParticipantType['adminAcceptance']
  sx?: SxProps<Theme>,
}) {
  let color = "warning";
  let label = "";
  switch (state) {
    case "PENDING": label = "pending"; color = "warning"; break;
    case "ACCEPTED": label = "accepted"; color = "success"; break;
    case "DECLINED": label = "declined"; color = "error"; break;
  }
  return (
    <Chip sx={[ ...(Array.isArray(sx) ? sx : [sx]) ]}
      size="small"
      label={label}
      color={color as "success" | "error" | "warning"}
    />
  )
}

function ParticipantView({
  id = '',
}: {
  id: string,
}) {
  id = decodeURIComponent(id);

  // provider
  const snackbar = useSnackbar();

  // fields
  const [participant, setParticipant] = useState<ParticipantType | "">("");

  // get
  const {
    called: getPartipantCalled,
    loading: getPartipantLoading,
    data: getPartipantData,
    error: getPartipantError,
    refetch: getParticipantRefetch,
  } = useQuery(
    GET_PARTICIPANT_QUERY, {
      variables: {
        id: id
      },
      onCompleted: data => {
        if (!data.listParticipants) return;
        const participant = data.listParticipants.edges[0]?.node;
        if (!participant)
          return;
        setParticipant(participant as ParticipantType);
      },
      onError: error => {console.log(error)},
    },
  );

  // admin accept participant
  const [ adminAcceptParticipant, {
    loading: adminAcceptParticipantLoading,
    reset: adminAcceptParticipantReset
  }] = useMutation(
    ADMIN_ACCEPT_PARTICIPANT_MUTATION, {
      onCompleted: data => {
        const response = data.adminAcceptParticipant;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Participant accepted", 'success');
          adminAcceptParticipantReset();
        } else {
          snackbar.showSnackbar("Participant not accepted", 'error');
          adminAcceptParticipantReset();
        }
        getParticipantRefetch().then(result => {
          if (!result.data.listParticipants) return;
          const participant = result.data.listParticipants.edges[0]?.node;
          if (!participant)
            return;
          setParticipant(participant as ParticipantType);
        });
      },
      onError: error => {},
      refetchQueries: [
        // GET_PARTICIPANT_QUERY
      ]
    }
  );

  // admin decline participant
  const [ adminDeclineParticipant, {
    loading: adminDeclineParticipantLoading,
    reset: adminDeclineParticipantReset
  }] = useMutation(
    ADMIN_DECLINE_PARTICIPANT_MUTATION, {
      onCompleted: data => {
        const response = data.adminDeclineParticipant;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Participant declined", 'success');
          adminDeclineParticipantReset();
        } else {
          snackbar.showSnackbar("Participant not declined", 'error');
          adminDeclineParticipantReset();
        }
        getParticipantRefetch().then(result => {
          if (!result.data.listParticipants) return;
          const participant = result.data.listParticipants.edges[0]?.node;
          if (!participant)
            return;
          setParticipant(participant as ParticipantType);
        });
      },
      onError: error => {},
      refetchQueries: [
        // GET_PARTICIPANT_QUERY
      ]
    }
  );

  // return
  if (getPartipantError)
    return <div>Error</div>;
  if (!getPartipantCalled || getPartipantLoading)
    return <div>Loading...</div>;
  if (!participant)
    return;
  return <Box>

    {/* State */}
    <Typography component="h2" variant="h5" marginY={2}>
      Participant: {participant.person.firstName} {participant.person.lastName}
    </Typography>
    <Box marginY={1}>
      <Typography>User Acceptance</Typography>
      <AcceptanceState state={participant.acceptance} sx={{ marginX: 1 }} />
    </Box>
    {!!participant.adminAcceptance && <>
      <Box marginY={1}>
        <Typography>Admin Acceptance</Typography>
        <AcceptanceState state={participant.adminAcceptance} sx={{ marginX: 1 }} />
        {participant.adminAcceptanceUser && <Box>
          <Typography variant="caption" sx={{ color: 'secondary.light' }}>
            - last change: {
              participant.adminAcceptanceUser.firstName
            } {
              participant.adminAcceptanceUser.lastName
            }
          </Typography>
        </Box>}
      </Box>
      {participant.acceptance === "ACCEPTED" &&
        <ButtonGroup variant="contained" aria-label="outlined button group" sx={{ my: 2 }}>
          {['PENDING', 'DECLINED'].includes(participant.adminAcceptance) && (
            <Button sx={{ backgroundColor: "#2e7d32" }} onClick={() =>
              adminAcceptParticipant({
                variables: { id: participant.id }
              })
            }>
              Accept
            </Button>
          )}
          {['PENDING', 'ACCEPTED'].includes(participant.adminAcceptance) && (
            <Button sx={{ backgroundColor: "#d32f2f" }} onClick={() =>
              adminDeclineParticipant({
                variables: { id: participant.id }
              })
            }>
              Cancel
            </Button>
          )}
        </ButtonGroup>
      }
    </>}

    {/* Match */}
    <Grid container spacing={2}>

      {/* User Qualifications */}
      <Grid xs={12} sm={6}>
        <Typography component="h3" variant="h6">
          User Qualifications
        </Typography>
        <Box sx={{ fontSize: 12 }}>
          <List>
            {participant.person.properties.edges
              .map(edge => edge?.node)
              .filter(onlyType)
              .filter(property =>
                property.group.organization.id
                === participant.shift.task.operation.project.organization.id)
              .map(property =>
                <ListItem key={property.id} sx={{ paddingY: 0 }}>
                  {property.group.name} | {property.name}
                </ListItem>
            )}
          </List>
        </Box>
      </Grid>

      {/* Role Requirements */}
      <Grid xs={12} sm={6}>
        <Typography component="h3" variant="h6" sx={{ marginBottom: 1 }}>
          Role Requirements
        </Typography>
        {!!participant.role.mandatory?.length &&
          <Box sx={{ fontSize: 12 }}>
            <b>Mandatory</b>
            <List>
              {participant.role.mandatory.map(property =>
                <ListItem key={property?.id} sx={{ paddingY: 0 }}>
                  {property?.group.name} / {property?.name}
                </ListItem>
              )}
            </List>
          </Box>
        }
        {!!participant.role.recommended?.length &&
          <Box sx={{ fontSize: 12 }}>
            <b>Recommended</b>
            <List>
              {participant.role.recommended.map(property =>
                <ListItem key={property?.id} sx={{ paddingY: 0 }}>
                  {property?.group.name} / {property?.name}
                </ListItem>
              )}
            </List>
          </Box>
        }
        {!!participant.role.unrecommended?.length &&
          <Box sx={{ fontSize: 12 }}>
            <b>Unrecommended</b>
            <List>
              {participant.role.unrecommended.map(property =>
                <ListItem key={property?.id} sx={{ paddingY: 0 }}>
                  {property?.group.name} / {property?.name}
                </ListItem>
              )}
            </List>
          </Box>
        }
        {!!participant.role.impossible?.length &&
          <Box sx={{ fontSize: 12 }}>
            <b>Impossible</b>
            <List>
              {participant.role.impossible.map(property =>
                <ListItem key={property?.id} sx={{ paddingY: 0 }}>
                  {property?.group.name} / {property?.name}
                </ListItem>
              )}
            </List>
          </Box>
        }
      </Grid>
    </Grid>
  </Box>;
}

export default ParticipantView;
