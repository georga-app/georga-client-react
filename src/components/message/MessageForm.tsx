/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';

import Button from "@mui/material/Button";

import Form from "@/components/shared/Form";
import {
  Input,
  Switch,
  EnumSelect,
  ObjectAutocomplete,
} from "@/components/shared/FormFields";
import { useSnackbar } from "@/provider/Snackbar";
import { useFilter, filterVariables } from '@/provider/Filter';
import { capitalizeFistLetter } from '@/app/utils'

import {
  GET_MESSAGE_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
} from "@/gql/message";

import {
  MessageType,
  OrganizationType,
  ProjectType,
  OperationType,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  UpdateMessageMutation,
  UpdateMessageMutationVariables,
  GeorgaMessageStateChoices,
  GeorgaMessageCategoryChoices,
  GeorgaMessagePriorityChoices,
  GeorgaMessageEmailDeliveryChoices,
  GeorgaMessagePushDeliveryChoices,
  GeorgaMessageSmsDeliveryChoices,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";


type Data = CreateMessageMutation
            | UpdateMessageMutation;
type Errors = FormErrors<
  CreateMessageMutationVariables
  | UpdateMessageMutationVariables
>;

function MessageForm({
  id = '',
  onSuccess = () => undefined,
  onError = () => undefined,
  disabled = false,
}: {
  id?: string,
  onSuccess?: (data: Data) => void,
  onError?: (data: Data) => void,
  disabled?: boolean,
}) {
  id = decodeURIComponent(id);

  // mode
  const create = !id;
  const edit = !!id;

  // context
  const snackbar = useSnackbar();
  const filter = useFilter();

  // states
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<Errors>({});

  // options
  enum categoryOptions {
    News = 'NEWS',
    Alert = 'ALERT',
  };
  enum priorityOptions {
    Low = 'LOW',
    Normal = 'NORMAL',
    Important = 'IMPORTANT',
    Urgent = 'URGENT',
  };

  // fields
  const [publish, setPublish] = useState(false);
  const [scope, setScope] = useState<MessageType['scope'] | "">("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [state, setState] = useState<GeorgaMessageStateChoices | "">("");
  const [category, setCategory] = useState<GeorgaMessageCategoryChoices | "">("");
  const [priority, setPriority] = useState<GeorgaMessagePriorityChoices | "">("");
  const [emailDelivery, setEmailDelivery] = useState<GeorgaMessageEmailDeliveryChoices | "">("");
  const [pushDelivery, setPushDelivery] = useState<GeorgaMessagePushDeliveryChoices | "">("");
  const [smsDelivery, setSmsDelivery] = useState<GeorgaMessageSmsDeliveryChoices | "">("");
  const [createdAt, setCreatedAt] = useState("");
  const [modifiedAt, setModifiedAt] = useState("");

  // create message
  const [ createMessage, {
    loading: createMessageLoading,
    reset: createMessageReset
  }] = useMutation(
    CREATE_MESSAGE_MUTATION, {
      onCompleted: data => {
        const response = data.createMessage;
        if (!response)
          return;
        if(response.errors.length === 0) {
          createMessageReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Message created", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          createMessageReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        'ListMessages'
      ]
    }
  );

  // get message
  const {
    called: getMessageCalled,
    loading: getMessageLoading,
    data: getMessageData,
    error: getMessageError
  } = useQuery(
    GET_MESSAGE_QUERY, {
      skip: create,
      variables: {
        id: id
      },
      onCompleted: data => {
        if (!data.listMessages) return;
        const message = data.listMessages.edges[0]?.node;
        if (!message)
          return;
        setScope(message.scope as MessageType['scope']);
        setTitle(message.title);
        setContents(message.contents);
        setState(message.state);
        setCategory(message.category);
        setPriority(message.priority);
        setEmailDelivery(message.emailDelivery);
        setPushDelivery(message.pushDelivery);
        setSmsDelivery(message.smsDelivery);
        setCreatedAt(message.createdAt);
        setModifiedAt(message.modifiedAt);
      },
    },
  );

  // update message
  const [ updateMessage, {
    loading: updateMessageLoading,
    reset: updateMessageReset
  }] = useMutation(
    UPDATE_MESSAGE_MUTATION, {
      onCompleted: data => {
        const response = data.updateMessage;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updateMessageReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Message updated", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateMessageReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "ListMessages"
      ]
    }
  );

  // change
  const handleChanged = (key: string, oldValue: any, newValue: any) => {
    if (!(key in changed))
      return setChanged({[key]: oldValue, ...changed});
    if (changed[key] == newValue)
      setChanged(({[key]: _, ...updated}) => updated);
  };

  // submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (create)
      createMessage({
        variables: {
          publish: publish,
          title: title,
          contents: contents,
          category: category,
          priority: priority,
          scope: scope ? scope.id : "",
        }
      });
    if (edit)
      updateMessage({
        variables: {
          id: id,
          title: title,
          contents: contents,
          category: category,
          priority: priority,
          scope: scope ? scope.id : "",
        }
      });
  }

  // return
  if (edit) {
    if (getMessageError)
      return <div>Error</div>;
    if (!getMessageCalled || getMessageLoading)
      return <div>Loading...</div>;
  }
  return (
    <Form handleSubmit={handleSubmit} error={errors.form}>

      {/* Fields */}
      {create && <>
        <Switch
          id="publish"
          value={publish}
          setValue={setPublish}
          errors={[]}
          label="Publish"
        />
      </>}
      <ObjectAutocomplete<MessageType['scope']>
        id="scope"
        value={scope}
        setValue={setScope}
        errors={[]}
        handleChanged={handleChanged}
        label="Scope"
        required
        organizations
        projects
        operations
        tasks
        shifts
        disabled={disabled}
      />
      <EnumSelect
        id="category"
        options={categoryOptions}
        getOptionLabel={option => capitalizeFistLetter(option.toLowerCase())}
        handleChanged={handleChanged}
        value={category}
        setValue={setCategory}
        label="Category"
        required
        disabled={disabled}
      />
      <EnumSelect
        id="priority"
        options={priorityOptions}
        getOptionLabel={option => capitalizeFistLetter(option.toLowerCase())}
        handleChanged={handleChanged}
        value={priority}
        setValue={setPriority}
        label="Priority"
        required
        disabled={disabled}
      />

      <Input
        id="title"
        value={title}
        setValue={setTitle}
        label="Title"
        handleChanged={handleChanged}
        errors={errors.title}
        required
        disabled={disabled}
      />
      <Input
        id="contents"
        value={contents}
        setValue={setContents}
        label="Description"
        multiline={true}
        handleChanged={handleChanged}
        errors={errors.contents}
        disabled={disabled}
      />
      {edit && <>
        <Input
          id="createdAt"
          value={new Date(createdAt).toLocaleString()}
          label="Created At"
          disabled
        />
        <Input
          id="modifiedAt"
          value={new Date(modifiedAt).toLocaleString()}
          label="Modified At"
          disabled
        />
        <Input
          id="state"
          value={state}
          label="State"
          disabled
        />
      </>}

      {/* Controls */}
      {!disabled &&
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ marginTop: 1 }}
          disabled={
            Object.keys(changed).length === 0
            || (edit && updateMessageLoading)
            || (create && createMessageLoading)
          }
        >
          {edit && (updateMessageLoading ? "Saving..." : "Save")}
          {create && (createMessageLoading ? "Creating..." : "Create")}
        </Button>
      }
    </Form>
  );
}

export default MessageForm;
