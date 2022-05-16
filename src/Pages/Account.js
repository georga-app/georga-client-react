import React from "react";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Theme from '../Components/Shared/Theme';
import PersonUpdateForm from '../Components/Models/PersonUpdateForm';

function Account(props) {
  const [expanded, setExpanded] = React.useState(false);

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
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          sx={{ width: '100%' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ flexShrink: 0 }}
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Profile</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Change your personal data
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PersonUpdateForm />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          sx={{ width: '100%' }}
        >
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
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          sx={{ width: '100%' }}
        >
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
