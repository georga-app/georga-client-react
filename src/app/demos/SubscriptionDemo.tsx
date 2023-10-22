/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useState } from "react";
import { useMutation, useSubscription } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { gql } from '@/__generated__/gql';
import { TestSubscription } from '@/__generated__/graphql';

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

import FormError from '@/components/shared/FormError';

const TEST_SUBSCRIPTION = gql(`
  subscription TestSubscription {
    testSubscription {
      message
      time
    }
  }
`);

const TEST_SUBSCRIPTION_EVENT_MUTATION = gql(`
  mutation TestSubscriptionEvent (
    $message: String!
  ) {
    testSubscriptionEvent(
      message: $message
    ) {
      response
    }
  }
`);

type SubscriptionDemoFormErrors = {
  form?: ApolloError["message"],
}

function SubscriptionDemo() {
  const [errors, setErrors] = useState<SubscriptionDemoFormErrors>({});
  const [message, setMessage] = useState("");
  const [testSubscriptionEvents, setTestSubscriptionsEvents] = useState<TestSubscription[]>([]);

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
      onData: ({ data }) => {
        if (!data?.data?.testSubscription)
          return;
        setTestSubscriptionsEvents(
          [data.data.testSubscription as TestSubscription, ...testSubscriptionEvents]
        );
      }
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
        {testSubscriptionEvents.map((event, index) => (
          <ListItem key={index}>
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
