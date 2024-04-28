/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from "@mui/material/Typography";

import { useFilter } from '@/provider/Filter';

import { GET_SUBSCRIBER_PERSON_QUERY } from '@/gql/person';

import {
  PersonType,
} from '@/types/__generated__/graphql';
import { onlyType } from "@/types/Util";

function PersonAddress({
  person,
}: {
  person: PersonType,
}) {
  if (!person.street || !person.number || !person.postalCode || !person.city)
    return "-";
  return <>
    {person.street} {person.number}, {person.postalCode} {person.city}
  </>;
}

function PersonSubscriberView({
  id = '',
}: {
  id: string,
}) {
  id = decodeURIComponent(id);

  // provider
  const filter = useFilter();

  // fields
  const [person, setPerson] = useState<PersonType | "">("");

  // get
  const {
    called: getSubscriberPersonCalled,
    loading: getSubscriberPersonLoading,
    data: getSubscriberPersonData,
    error: getSubscriberPersonError,
    refetch: getParticipantRefetch,
  } = useQuery(
    GET_SUBSCRIBER_PERSON_QUERY, {
      variables: {
        organization: filter.organization,
        id: id
      },
      onCompleted: data => {
        if (!data.listPersons) return;
        const person = data.listPersons.edges[0]?.node;
        if (!person)
          return;
        setPerson(person as PersonType);
      },
      onError: error => {},
    },
  );

  // return
  if (getSubscriberPersonError)
    return <div>Error</div>;
  if (!getSubscriberPersonCalled || getSubscriberPersonLoading)
    return <div>Loading...</div>;
  if (!person)
    return;
  return <Box>

    {/* Title */}
    <Typography component="h2" variant="h5" marginY={2}>
      Subscriber: {person.firstName} {person.lastName}
    </Typography>

    <Grid container spacing={2}>

      {/* Contacts */}
      <Grid xs={12} sm={6}>
        <Typography component="h3" variant="h6" marginY={2}>
          Contacts
        </Typography>
        <List>
          <ListItem key="email" sx={{ padding: 0 }}>
            Email: {person.email || "-"}
          </ListItem>
          <ListItem key="mobile-phone" sx={{ padding: 0 }}>
            Mobile Phone: {person.mobilePhone || "-"}
          </ListItem>
          <ListItem key="private-phone" sx={{ padding: 0 }}>
            Private Phone: {person.privatePhone || "-"}
          </ListItem>
          <ListItem key="address" sx={{ padding: 0 }}>
            Address: <PersonAddress person={person} />
          </ListItem>
        </List>
      </Grid>

      {/* Qualifications */}
      <Grid xs={12} sm={6}>
        <Typography component="h3" variant="h6" marginY={2}>
          Qualifications
        </Typography>
        <List>
          {person.properties.edges.map(edge => edge?.node).filter(onlyType).map(property =>
            <ListItem key={property.id} sx={{ padding: 0 }}>
              {property.group.name} | {property.name}
            </ListItem>
          )}
        </List>
      </Grid>
    </Grid>

  </Box>;
}

export default PersonSubscriberView;
