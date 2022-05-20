import { useState } from "react";
import { gql, useMutation, useSubscription } from '@apollo/client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import PropTypes from 'prop-types';

import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import FormError from '../Components/Shared/FormError';
import Theme from '../Components/Shared/Theme';
import PersonDataTable from '../Components/Models/PersonDataTable';

const icon = L.icon({
    iconRetinaUrl:iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
});

const TEST_SUBSCRIPTION = gql`
  subscription TestSubscription (
    $arg1: String!
    $arg2: String!
  ) {
    testSubscription(
      arg1: $arg1
      arg2: $arg2
    ) {
      message
      time
    }
  }
`;

const TEST_SUBSCRIPTION_EVENT_MUTATION = gql`
  mutation TestSubscriptionEvent (
    $message: String!
  ) {
    testSubscriptionEvent(
      message: $message
    ) {
      response
    }
  }
`;

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
  const position = [52.51682, 13.42511]

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [testSubscriptionEvents, setTestSubscriptionsEvents] = useState([]);

  const [testSubscriptionEvent, { loading, reset }] = useMutation(
    TEST_SUBSCRIPTION_EVENT_MUTATION, {
      onCompleted: data => {
        setMessage("");
        reset();
      },
      onError: error => {
        setErrors({form: error.message});
        reset();
      }
    }
  );

  useSubscription(
    TEST_SUBSCRIPTION, {
      variables: {
        arg1: 'arg1',
        arg2: 'arg2',
      },
      onSubscriptionData: ({ subscriptionData }) => {
        setTestSubscriptionsEvents(
          [subscriptionData.data.testSubscription, ...testSubscriptionEvents]
        );
      }
    }
  );

  function handleChange(event, newValue) {
    setTabValue(newValue);
  };

  function handleSubmit(event) {
    event.preventDefault();
    testSubscriptionEvent({
      variables: {
        message: message,
      }
    });
  }

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

        {/* Subscriptions */}
        <TabPanel value={tabValue} index={2}>
          <form onSubmit={event => handleSubmit(event)} autoComplete="off">
            <FormControl margin="normal" required fullWidth error={Boolean(errors.email)}>
              <InputLabel htmlFor="message">Message</InputLabel>
              <Input
                id="message"
                type="input"
                onChange={event => setMessage(event.target.value)}
                value={message}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={
                loading ||
                !message.trim()
              }
              sx={{ marginTop: 1 }}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
            <FormError error={errors?.form}/>
          </form>
          <List>
            {testSubscriptionEvents.map(event => (
              <ListItem key={event.time}>
                <ListItemAvatar>
                  <Avatar>
                    <CircleNotificationsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={event.message} secondary={event.time} />
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Box>

    </Theme>
  );
}

export default Dashboard;
