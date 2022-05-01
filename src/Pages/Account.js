import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Theme from '../Components/Shared/Theme';
import PersonForm from '../Components/Models/PersonForm';

const GET_PERSON = gql`
  query ReadPerson ($id: ID!) {
    node(id: $id) {
      ... on PersonType {
        email
        password
        firstName
        lastName
        mobilePhone
      }
    }
  }
`;

const UPDATE_PERSON = gql`
  mutation UpdatePerson (
    $email: String!,
    $firstName: String,
    $lastName: String,
    $mobilePhone: String
  ) {
    registerPerson(
      input: {
        email: $email,
        password: $password,
        firstName: $firstName,
        lastName: $lastName,
        mobilePhone: $mobilePhone
      }
    ) {
      person {
        email
      }
      errors {
        field
        messages
      }
    }
  }
`;

function Account(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [errors, setErrors] = useState({});

  const { getLoading, getError, getData } = useQuery(GET_DOGS);
  const [updatePerson, { updateLoading, updateReset }] = useMutation(
    UPDATE_PERSON, {
      onCompleted: data => {
        if(data.registerPerson.errors.length === 0) {
          // ?
        } else {
          var fieldErrors = {};
          data.registerPerson.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateReset();
        }
      },
      onError: error => {
        setErrors({form: error.message});
      }
    }
  );

  function handleSubmit(event) {
    event.preventDefault();
    updatePerson({
      variables: {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        mobilePhone: this.state.mobilePhone,
      }
    });
  }

  function handleChange(panel) {
    return (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    }
  };

  return (
    <Theme menus={props.menus} bgcolor="none">
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          marginX: {
            xs: 1,
            md: "auto"
          },
          width: {
            xs: "auto",
            md: 700
          },
        }}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Profile</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Change your personal data
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PersonForm
              handleSubmit={handleSubmit}
              loading={updateLoading}
              errors={errors}
              buttonText={updateLoading ? "Saving..." : "Save"}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Notifications</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Configure which message you receive
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
              varius pulvinar diam eros in elit. Pellentesque convallis laoreet
              laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Security</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Add security to your login
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
              varius pulvinar diam eros in elit. Pellentesque convallis laoreet
              laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Theme>
  );
}

export default Account;
