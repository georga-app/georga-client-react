/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Snackbar from '@mui/material/Snackbar';
// import TextField from '@mui/material/TextField';

import { useSnackbar } from "@/provider/Snackbar";
import FormFieldError from "@/components/shared/FormFieldError";
import FormError from "@/components/shared/FormError";

import { gql } from '@/__generated__/gql';
import { OrganizationType, ListOrganizationsQuery } from '@/__generated__/graphql';
import { UpdateOrganizationMutation } from '@/__generated__/graphql';
import { OrganizationFormErrors } from "@/types/FormErrors";

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
  organizationId,
  onSuccess = () => undefined,
  onError = () => undefined,
}: {
  organizationId: string,
  onSuccess?: (data: UpdateOrganizationMutation) => void,
  onError?: (data: UpdateOrganizationMutation) => void,
}) {
  const [success, setSuccess] = useState(false);
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<OrganizationFormErrors>({});
  const snackbar = useSnackbar();

  // fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  // const [state, setState] = useState("");

  // getOrganization
  const {
    called: getOrganizationCalled,
    loading: getOrganizationLoading,
    data: getOrganizationData,
    error: getOrganizationError
  } = useQuery(
    GET_ORGANIZATION_QUERY, {
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
  if (getOrganizationError)
    return <div>Error</div>;
  if (!getOrganizationCalled || getOrganizationLoading)
    return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>

      {/* Errors */}
      <FormError error={errors.form}/>

      {/* Fields */}
      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.name)}
        fullWidth
      >
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          value={name}
          onChange={(event) => {
            handleChanged('name', name, event.target.value);
            setName(event.target.value);
          }}
        />
        <FormFieldError error={errors.name}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.description)}
        fullWidth
      >
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input
          id="description"
          value={description}
          onChange={(event) => {
            handleChanged('description', description, event.target.value);
            setDescription(event.target.value);
          }}
        />
        <FormFieldError error={errors.description}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.icon)}
        fullWidth
      >
        <InputLabel htmlFor="icon">Icon</InputLabel>
        <Input
          id="icon"
          value={icon}
          onChange={(event) => {
            handleChanged('icon', icon, event.target.value);
            setIcon(event.target.value);
          }}
        />
        <FormFieldError error={errors.icon}/>
      </FormControl>

      {/* Controls */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={
          updateOrganizationLoading
          || Object.keys(changed).length === 0
        }
      >
        {updateOrganizationLoading ? "Saving..." : "Save"}
      </Button>

    </form>
  )
}

export default OrganizationForm;
