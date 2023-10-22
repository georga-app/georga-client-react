/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';

import OneColumn from '@/theme/layouts/OneColumn';
import PersonProfileForm from '@/components/person/ProfileForm';
import PersonOrganizationsTable from '@/components/person/OrganizationsTable';

import Panels from '@/types/Panels';

function Account() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const panels: Panels[] = [
    {
      title: "Profile",
      icon: <PersonIcon />,
      description: "Change your personal data",
      content: <PersonProfileForm />,
    },
    {
      title: "Organizations",
      icon: <GroupsIcon />,
      description: "Subscribe to organizations",
      content: <PersonOrganizationsTable />,
    },
    {
      title: "Qualifications",
      icon: <VerifiedIcon />,
      description: "Manage your qualifications and restrictions",
      content: (
        <Typography>
          Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
          varius pulvinar diam eros in elit. Pellentesque convallis laoreet
          laoreet.
        </Typography>
      ),
    },
    {
      title: "Notifications",
      icon: <NotificationsIcon />,
      description: "Configure your notification channels",
      content: (
        <Typography>
          Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
          varius pulvinar diam eros in elit. Pellentesque convallis laoreet
          laoreet.
        </Typography>
      ),
    },
    {
      title: "Security",
      icon: <SecurityIcon />,
      description: "Add security to your login",
      content: (
        <Typography>
          Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
          varius pulvinar diam eros in elit. Pellentesque convallis laoreet
          laoreet.
        </Typography>
      ),
    },
  ]

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <OneColumn bg='admin'>
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

        {panels.map((panel, index) =>
          <Accordion
            key={index}
            expanded={expanded === 'panel' + index}
            onChange={handleChange('panel' + index)}
            sx={{ width: '100%' }}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"panel" + index + "bh-content"}
              id={"panel" + index + "bh-header"}
              sx={{ flexShrink: 0 }}
            >
              <Box sx={{ lineHeight: 1, height: 0, color: 'primary.main' }}>
                {panel.icon}
              </Box>
              <Typography sx={{ width: '33%', flexShrink: 0, marginLeft: 2 }}>
                {panel.title}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {panel.description}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {panel.content}
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
    </OneColumn>
  );
}

export default Account;
