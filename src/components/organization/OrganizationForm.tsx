/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';

import Button from "@mui/material/Button";

import Form from "@/components/shared/Form";
import { Input } from "@/components/shared/FormFields";
import { useSnackbar } from "@/provider/Snackbar";

import { gql } from '@/__generated__/gql';
import {
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables,
  UpdateOrganizationMutation,
  UpdateOrganizationMutationVariables,
} from '@/__generated__/graphql';
const CREATE_ORGANIZATION_MUTATION = gql(`
  mutation CreateOrganization (
    $name: String!
    $description: String
    $icon: String
  ) {
    createOrganization (
      input: {
        name: $name
        description: $description
        icon: $icon
      }
    ) {
      organization {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const GET_ORGANIZATION_QUERY = gql(`
  query GetOrganizations (
    $id: ID!
  ) {
    listOrganizations (
      id: $id
    ) {
      edges {
        node {
          id
          createdAt
          modifiedAt
          name
          description
          icon
        }
      }
    }
  }
`);

const UPDATE_ORGANIZATION_MUTATION = gql(`
  mutation UpdateOrganization (
    $id: ID!
    $name: String
    $description: String
    $icon: String
  ) {
    updateOrganization (
      input: {
        id: $id
        name: $name
        description: $description
        icon: $icon
      }
    ) {
      organization {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

function OrganizationForm({
  organizationId = '',
  onSuccess = () => undefined,
  onError = () => undefined,
}: {
}) {
  // mode
  const create = !(organizationId);
  const edit = (organizationId);

  // context
  const snackbar = useSnackbar();

  // states
  const [success, setSuccess] = useState(false);
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<OrganizationFormErrors>({});

  // fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  // const [state, setState] = useState("");

  // createOrganization
  const [ createOrganization, {
    loading: createOrganizationLoading,
    reset: createOrganizationReset
  }] = useMutation(
    CREATE_ORGANIZATION_MUTATION, {
      onCompleted: data => {
        const response = data.createOrganization;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updateOrganizationReset();
          setErrors({});
          setChanged({});
          setSuccess(true);
          snackbar.showSnackbar("Organization created", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateOrganizationReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "ListOrganizations"
      ]
    }
  );

  // getOrganization
  const {
    called: getOrganizationCalled,
    loading: getOrganizationLoading,
    data: getOrganizationData,
    error: getOrganizationError
  } = useQuery(
    GET_ORGANIZATION_QUERY, {
      skip: create,
      variables: {
        id: organizationId
      },
      onCompleted: data => {
        if (!data.listOrganizations) return;
        const organization = data.listOrganizations.edges[0]?.node;
        if (!organization)
          return;
        setName(organization.name);
        setDescription(organization.description || '');
        setIcon(organization.icon || '');
      },
    },
  );

  // updateOrganization
  const [ updateOrganization, {
    loading: updateOrganizationLoading,
    reset: updateOrganizationReset
  }] = useMutation(
    UPDATE_ORGANIZATION_MUTATION, {
      onCompleted: data => {
        const response = data.updateOrganization;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updateOrganizationReset();
          setErrors({});
          setChanged({});
          setSuccess(true);
          snackbar.showSnackbar("Organization updated", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateOrganizationReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "ListOrganizations"
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
      createOrganization({
        variables: {
          name: name,
          description: description,
          icon: icon,
        }
      });
    if (edit)
      updateOrganization({
        variables: {
          id: organizationId,
          name: name,
          description: description,
          icon: icon,
        }
      });
  }

  // success
  const handleSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway')
      return;
    setSuccess(false);
  };

  // return
  if (edit) {
    if (getOrganizationError)
      return <div>Error</div>;
    if (!getOrganizationCalled || getOrganizationLoading)
      return <div>Loading...</div>;
  }
  return (
    <Form handleSubmit={handleSubmit} error={errors.form}>

      {/* Fields */}
      <Input
        key="name"
        value={name}
        setValue={setName}
        handleChanged={handleChanged}
        errors={errors.name}
      />
      <Input
        key="description"
        value={description}
        setValue={setDescription}
        handleChanged={handleChanged}
        errors={errors.description}
      />
      <Input
        key="icon"
        value={icon}
        setValue={setIcon}
        handleChanged={handleChanged}
        errors={errors.icon}
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
          || (edit && updateOrganizationLoading)
          || (create && createOrganizationLoading)
        }
      >
        {edit && (updateOrganizationLoading ? "Saving..." : "Save")}
        {create && (createOrganizationLoading ? "Creating..." : "Create")}
      </Button>
    </Form>
  );
}

export default OrganizationForm;
