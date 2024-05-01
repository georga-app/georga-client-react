/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useState } from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import OneColumn from '@/theme/layouts/OneColumn';

import LeafletDemo from './LeafletDemo';
import SubscriptionDemo from './SubscriptionDemo';

function TabPanel({
  children,
  index,
  value,
  ...other
}: {
  children?: React.ReactNode,
  index: number,
  value: number,
}) {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`demo-tabpanel-${index}`}
      aria-labelledby={`demo-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `demo-tab-${index}`,
    'aria-controls': `demo-tabpanel-${index}`,
  };
}

function Dashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <OneColumn>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="demo tabs">
            <Tab label="Datatable" {...a11yProps(0)} />
            <Tab label="Leaflet" {...a11yProps(1)} />
            <Tab label="Subscriptions" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Leaflet */}
        <TabPanel value={tabValue} index={1}>
          <LeafletDemo />
        </TabPanel>

        {/* Subscriptions */}
        <TabPanel value={tabValue} index={2}>
          <SubscriptionDemo />
        </TabPanel>
      </Box>
    </OneColumn>
  );
}

export default Dashboard;
