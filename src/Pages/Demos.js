import { useState } from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import Theme from '../Components/Shared/Theme';
import DataTableDemo from '../Components/Demos/DataTableDemo';
import LeafletDemo from '../Components/Demos/LeafletDemo';
import SubscriptionDemo from '../Components/Demos/SubscriptionDemo';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `demo-tab-${index}`,
    'aria-controls': `demo-tabpanel-${index}`,
  };
}

function Dashboard(props) {
  const [tabValue, setTabValue] = useState(0);

  function handleChange(event, newValue) {
    setTabValue(newValue);
  };

  return (
    <Theme menus={props.menus}>

      {/* Demos */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="demo tabs">
            <Tab label="Datatable" {...a11yProps(0)} />
            <Tab label="Leaflet" {...a11yProps(1)} />
            <Tab label="Subscriptions" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Datatable */}
        <TabPanel value={tabValue} index={0}>
          <DataTableDemo />
        </TabPanel>

        {/* Leaflet */}
        <TabPanel value={tabValue} index={1}>
          <LeafletDemo />
        </TabPanel>

        {/* Subscriptions */}
        <TabPanel value={tabValue} index={2}>
          <SubscriptionDemo />
        </TabPanel>
      </Box>

    </Theme>
  );
}

export default Dashboard;
