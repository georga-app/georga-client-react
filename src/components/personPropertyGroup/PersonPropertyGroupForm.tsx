/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from '@apollo/client';

import Button from "@mui/material/Button";

import Form from "@/components/shared/Form";
import { EnumSelect } from "@/components/shared/FormFields";
import { Input } from "@/components/shared/FormFields";
import { useSnackbar } from "@/provider/Snackbar";
import { useFilter } from '@/provider/Filter';

import PersonPropertyTable from '@/components/personProperty/PersonPropertyTable';

import {
  CREATE_PERSON_PROPERTY_MUTATION,
  UPDATE_PERSON_PROPERTY_MUTATION,
  DELETE_PERSON_PROPERTY_MUTATION,
} from '@/gql/personProperty';
import {
  GET_PERSON_PROPERTY_GROUP_QUERY,
  LIST_PERSON_PROPERTY_GROUPS_QUERY,
  CREATE_PERSON_PROPERTY_GROUP_MUTATION,
  UPDATE_PERSON_PROPERTY_GROUP_MUTATION,
} from '@/gql/personPropertyGroup';

import {
  CreatePersonPropertyGroupMutation,
  CreatePersonPropertyGroupMutationVariables,
  OrganizationType,
  PersonPropertyType,
  GeorgaPersonPropertyGroupNecessityChoices,
  GeorgaPersonPropertyGroupSelectionTypeChoices,
  UpdatePersonPropertyGroupMutation,
  UpdatePersonPropertyGroupMutationVariables,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";

type Data = CreatePersonPropertyGroupMutation
            | UpdatePersonPropertyGroupMutation;
type Errors = FormErrors<
  CreatePersonPropertyGroupMutationVariables
  | UpdatePersonPropertyGroupMutationVariables
>;

function PersonPropertyGroupForm({
  id = '',
  onSuccess = () => undefined,
  onError = () => undefined,
}: {
  id?: string,
  onSuccess?: (data: Data) => void,
  onError?: (data: Data) => void,
}) {
  id = decodeURIComponent(id);

  // mode
  const create = !(id);
  const edit = (id);

  // context
  const snackbar = useSnackbar();
  const filter = useFilter();
  const client = useApolloClient();

  // states
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<Errors>({});
  const [
    personPropertiesOriginal,
    setPersonPropertiesOriginal
  ] = useState<PersonPropertyType[]>([]);

  // fields
  const [organization, setOrganization] = useState<OrganizationType | "">("");
  const [name, setName] = useState("");
  const [selectionType, setSelectionType] =
    useState<`${GeorgaPersonPropertyGroupSelectionTypeChoices}`>("MULTISELECT");
  const [necessity, setNecessity] =
    useState<`${GeorgaPersonPropertyGroupNecessityChoices}`>("RECOMMENDED");
  const [personProperties, setPersonProperties] = useState<PersonPropertyType[]>([]);
  const [createdAt, setCreatedAt] = useState("");
  const [modifiedAt, setModifiedAt] = useState("");

  // create person property group
  const [ createPersonPropertyGroup, {
    loading: createPersonPropertyGroupLoading,
    reset: createPersonPropertyGroupReset
  }] = useMutation(
    CREATE_PERSON_PROPERTY_GROUP_MUTATION, {
      onCompleted: data => {
        const response = data.createPersonPropertyGroup;
        if (!response)
          return;
        if(response.errors.length === 0) {
          createPersonPropertyGroupReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Qualification created", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          createPersonPropertyGroupReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "ListPersonPropertyGroups"
      ]
    }
  );

  // get person property group
  const {
    called: getPersonPropertyGroupCalled,
    loading: getPersonPropertyGroupLoading,
    data: getPersonPropertyGroupData,
    error: getPersonPropertyGroupError
  } = useQuery(
    GET_PERSON_PROPERTY_GROUP_QUERY, {
      skip: create,
      fetchPolicy: 'network-only',
      variables: {
        id: id
      },
      onCompleted: data => {
        if (!data.listPersonPropertyGroups) return;
        const personPropertyGroup = data.listPersonPropertyGroups.edges[0]?.node;
        if (!personPropertyGroup)
          return;
        const personProperties = personPropertyGroup.personpropertySet.edges
          .map((edge) => edge?.node)
          .filter((node): node is PersonPropertyType => node !== undefined);
        setOrganization(personPropertyGroup?.organization as OrganizationType);
        setName(personPropertyGroup.name || '');
        setSelectionType(personPropertyGroup.selectionType);
        setNecessity(personPropertyGroup.necessity);
        setPersonPropertiesOriginal(personProperties);
        setPersonProperties(personProperties);
        setCreatedAt(personPropertyGroup.createdAt);
        setModifiedAt(personPropertyGroup.modifiedAt);
      },
    },
  );

  // create person property
  const [ createPersonProperty, {
    loading: createPersonPropertyLoading,
    reset: createPersonPropertyReset
  }] = useMutation(
    CREATE_PERSON_PROPERTY_MUTATION, {
      onCompleted: data => {
        const response = data.createPersonProperty;
        if (!response)
          return;
        createPersonPropertyReset();
      },
      // refetchQueries: [
      //   GET_PERSON_PROPERTY_GROUP_QUERY
      // ]
    }
  );

  // update role
  const [ updatePersonProperty, {
    loading: updatePersonPropertyLoading,
    reset: updatePersonPropertyReset
  }] = useMutation(
    UPDATE_PERSON_PROPERTY_MUTATION, {
      onCompleted: data => {
        const response = data.updatePersonProperty;
        if (!response)
          return;
        updatePersonPropertyReset();
      },
      // refetchQueries: [
      //   GET_PERSON_PROPERTY_GROUP_QUERY
      // ]
    }
  );

  // delete role
  const [ deletePersonProperty, {
    loading: deletePersonPropertyLoading,
    reset: deletePersonPropertyReset
  }] = useMutation(
    DELETE_PERSON_PROPERTY_MUTATION, {
      onCompleted: data => {
        const response = data.deletePersonProperty;
        if (!response)
          return;
        deletePersonPropertyReset();
      },
      // refetchQueries: [
      //   GET_PERSON_PROPERTY_GROUP_QUERY
      // ]
    }
  );

  // update person property group
  const [ updatePersonPropertyGroup, {
    loading: updatePersonPropertyGroupLoading,
    reset: updatePersonPropertyGroupReset
  }] = useMutation(
    UPDATE_PERSON_PROPERTY_GROUP_MUTATION, {
      onCompleted: data => {
        const response = data.updatePersonPropertyGroup;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updatePersonPropertyGroupReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Qualification updated", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updatePersonPropertyGroupReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "GetPersonPropertyGroup"
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let personPropertyGroupId = id;
    // person property group create
    if (create) {
      const personPropertyGroupResult = await createPersonPropertyGroup({
        variables: {
          organization: organization ? organization.id : "",
          name: name,
          selectionType: selectionType,
          necessity: necessity,
        }
      });
      personPropertyGroupId =
        personPropertyGroupResult.data?.createPersonPropertyGroup?.personPropertyGroup?.id || '';
    }
    // person property group update
    if (edit) {
      await updatePersonPropertyGroup({
        variables: {
          id: id,
          name: name,
          selectionType: selectionType,
          necessity: necessity,
        }
      });
    }

    // person property create
    await personProperties.forEach(personProperty => {
      if (!personProperty.id || !personProperty.id.startsWith("CREATE!"))
        return;
      createPersonProperty({
        variables: {
          group: personPropertyGroupId,
          name: personProperty.name,
        }
      });
    });
    // person property delete
    const personPropertiesToDelete = personPropertiesOriginal.reduce(
      (result: PersonPropertyType[], entry: PersonPropertyType) => {
        if (personProperties.findIndex(personProperty => personProperty?.id === entry.id) == -1)
          result.push(entry)
        return result
      }, []
    );
    await personPropertiesToDelete.forEach(personProperty => {
      deletePersonProperty({
        variables: {
          id: personProperty.id,
        }
      })
    });
    // person property update
    await personProperties.forEach(personProperty => {
      if (!personProperty.id || personProperty.id.startsWith("CREATE!"))
        return;
      updatePersonProperty({
        variables: {
          id: personProperty.id,
          name: personProperty.name,
        }
      })
    });
    // refetch
    // await client.refetchQueries({
    //   include: [GET_TASK_QUERY],
    // });
  }

  // return
  if (edit) {
    if (getPersonPropertyGroupError)
      return <div>Error</div>;
    if (!getPersonPropertyGroupCalled || getPersonPropertyGroupLoading)
      return <div>Loading...</div>;
  }
  return (
    <Form handleSubmit={handleSubmit} error={errors.form}>

      {/* Fields */}
      {edit && <>
        <Input
          id="organization"
          value={organization ? organization.name : ""}
          label="Operation"
          disabled
        />
      </>}
      <Input
        id="name"
        value={name}
        setValue={setName}
        label="Name"
        handleChanged={handleChanged}
        errors={errors.name}
        required
      />
      <EnumSelect
        id="selectionType"
        options={GeorgaPersonPropertyGroupSelectionTypeChoices}
        getOptionLabel={option => {
          switch(option) {
            case "Multiselect": return "Multiple Choice";
            case "Singleselect": return "Single Select";
            default: return "";
          }
        }}
        value={selectionType}
        setValue={setSelectionType}
        label="Type"
        handleChanged={handleChanged}
        errors={errors.selectionType}
        required
      />

      <PersonPropertyTable
        groupId={id}
        personProperties={personProperties}
        setPersonProperties={setPersonProperties}
        handleChanged={handleChanged}
        title="Choices"
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
      </>}

      {/* Controls */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={
          Object.keys(changed).length === 0
          || (edit && updatePersonPropertyGroupLoading)
          || (create && createPersonPropertyGroupLoading)
        }
      >
        {edit && (updatePersonPropertyGroupLoading ? "Saving..." : "Save")}
        {create && (createPersonPropertyGroupLoading ? "Creating..." : "Create")}
      </Button>
    </Form>
  );
}

export default PersonPropertyGroupForm;
