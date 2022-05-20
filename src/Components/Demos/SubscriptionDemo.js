import { useState } from "react";
import { gql, useMutation, useSubscription } from '@apollo/client';

import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

import FormError from '../Shared/FormError';

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


function SubscriptionDemo(props) {
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

  function handleSubmit(event) {
    event.preventDefault();
    testSubscriptionEvent({
      variables: {
        message: message,
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormControl
          margin="normal"
          variant="standard"
          required
          fullWidth
        >
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
    </>
  )
}

export default SubscriptionDemo;
