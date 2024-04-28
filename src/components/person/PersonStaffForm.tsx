/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import { useQuery, useMutation, useApolloClient } from '@apollo/client';

import Button from "@mui/material/Button";

import { useFilter } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";

import Form from "@/components/shared/Form";
import { Input, Autocomplete } from "@/components/shared/FormFields";
import AceTable from "@/components/ace/AceTable";

import { LIST_STAFF_PERSONS_QUERY } from '@/gql/person';
import {
  GET_STAFF_PERSON_QUERY,
} from '@/gql/person';
import {
  CREATE_ACE_MUTATION,
  DELETE_ACE_MUTATION,
} from '@/gql/ace';

import {
  AceType,
} from '@/types/__generated__/graphql';

function PersonStaffForm({
  id = '',
  onSuccess = () => undefined,
  onError = () => undefined,
}: {
  id?: string,
  onSuccess?: () => void,
  onError?: () => void,
}) {
  id = decodeURIComponent(id);

  // provider
  const snackbar = useSnackbar();
  const filter = useFilter();
  const client = useApolloClient();

  // states
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [acesOriginal, setAcesOriginal] = useState<AceType[]>([]);

  // fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [aces, setAces] = useState<AceType[]>([]);

  // get staff person
  const {
    called: getStaffPersonCalled,
    loading: getStaffPersonLoading,
    data: getStaffPersonData,
    error: getStaffPersonError
  } = useQuery(
    GET_STAFF_PERSON_QUERY, {
      variables: {
        id: id,
        organizationsEmployed: filter.organization,
      },
      onCompleted: data => {
        if (!data.listPersons) return;
        const person = data.listPersons.edges[0]?.node;
        if (!person)
          return;
        const aces = person.aceSet.edges.map((edge) => edge?.node as AceType);
        setEmail(person.email);
        setFirstName(person.firstName);
        setLastName(person.lastName);
        setDateJoined(person.dateJoined);
        setAcesOriginal(aces)
        setAces(aces)
      },
    },
  );

  // create acl
  const [ createAce, {
    loading: createAceLoading,
    reset: createAceReset
  }] = useMutation(
    CREATE_ACE_MUTATION, {
      onCompleted: data => {
        const response = data.createAce;
        if (!response)
          return;
        createAceReset();
      },
      // refetchQueries: [
      //   GET_TASK_QUERY
      // ]
    }
  );

  // delete acl
  const [ deleteAce, {
    loading: deleteAceLoading,
    reset: deleteAceReset
  }] = useMutation(
    DELETE_ACE_MUTATION, {
      onCompleted: data => {
        const response = data.deleteAce;
        if (!response)
          return;
        deleteAceReset();
      },
      // refetchQueries: [
      //   GET_TASK_QUERY
      // ]
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ace create
    await aces.forEach(ace => {
      if (!ace.id || !ace.id.startsWith("CREATE!"))
        return;
      createAce({
        variables: {
          person: ace.person.id,
          instance: ace.instance.id,
          permission: ace.permission,
        }
      });
    });
    // ace delete
    const acesToDelete = acesOriginal.reduce((result: AceType[], entry: AceType) => {
      if (aces.findIndex(ace => ace?.id === entry.id) == -1)
        result.push(entry)
      return result
    }, []);
    await acesToDelete.forEach(ace => {
      deleteAce({
        variables: {
          id: ace.id,
        }
      })
    });
    onSuccess();
    // refetch
    // await client.refetchQueries({
    //   include: [LIST_STAFF_PERSONS_QUERY],
    // });
  }

  // return
  if (getStaffPersonError)
    return <div>Error</div>;
  if (!getStaffPersonCalled || getStaffPersonLoading)
    return <div>Loading...</div>;
  return (
    <Form handleSubmit={handleSubmit} error="">

      {/* Fields */}
      <Input
        id="name"
        value={firstName + " " + lastName}
        label="Name"
        disabled
      />
      <Input
        id="email"
        value={email}
        label="Email"
        disabled
      />

      <AceTable
        personId={id}
        organizationId={filter.organization}
        aces={aces}
        setAces={setAces}
        handleChanged={handleChanged}
        title="Permissions"
      />

      <Input
        id="date-joined"
        value={dateJoined}
        label="Joined"
        disabled
      />

      {/* Controls */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={
          Object.keys(changed).length === 0
        }
      >
        Save
      </Button>

    </Form>
  )
}

export default PersonStaffForm;
