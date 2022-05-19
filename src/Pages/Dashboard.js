import React from "react";

import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import Theme from '../Components/Shared/Theme';
import PersonDataTable from '../Components/Models/PersonDataTable';

const icon = L.icon({
    iconRetinaUrl:iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
});

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
  const [tabValue, setTabValue] = React.useState(0);
  const position = [52.51682, 13.42511]

  const handleChange = (event, newValue) => {
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
          </Tabs>
        </Box>

        {/* Datatable */}
        <TabPanel value={tabValue} index={0}>
          <PersonDataTable />
        </TabPanel>

        {/* Leaflet */}
        <TabPanel value={tabValue} index={1}>
          <MapContainer
            center={position}
            zoom={17}
            scrollWheelZoom={false}
            style={{height : '400px'}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={icon}>
              <Popup>
                Open Knowledge Foundation Deutschland e.V.
              </Popup>
            </Marker>
          </MapContainer>
        </TabPanel>
      </Box>

    </Theme>
  );
}

export default Dashboard;
