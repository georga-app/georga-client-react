/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';

import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Form from "@/components/shared/Form";
import { Input, EnumSelect } from "@/components/shared/FormFields";

import { GET_ORGANIZATION_QUERY } from '@/gql/organization';
import { LIST_PROJECTS_QUERY } from '@/gql/project';
import { LIST_OPERATIONS_QUERY } from '@/gql/operation';

import {
  AceType,
  OrganizationType,
  ProjectType,
  OperationType,
  GeorgaAcePermissionChoices,
} from '@/types/__generated__/graphql';
import { onlyType } from "@/types/Util";

function AceForm({
  personId,
  organizationId,
  ace,
  onApply = (role) => undefined,
  onSuccess = () => undefined,
}: {
  personId: string,
  organizationId: string,
  ace: AceType,
  onApply?: (role: AceType) => void,
  onSuccess?: () => void,
}) {
  // options
  const [organizationOptions, setOrganizationOptions] = useState<OrganizationType[]>([]);
  const [operationOptions, setOperationOptions] = useState<OperationType[]>([]);
  const [projectOptions, setProjectOptions] = useState<ProjectType[]>([]);

  // fields
  const [permission, setPermission] = useState<AceType['permission'] | "">("");
  const [instance, setInstance] = useState<AceType['instance'] | "">("");

  // get organization
  const {
    data: getOrganizationData,
    loading: getOrganizationLoading,
  } = useQuery(
    GET_ORGANIZATION_QUERY, {
      variables: {
        id: organizationId
      },
      onCompleted: data => {
        const organizations = data.listOrganizations?.edges.map((edge) => edge?.node)
          .filter((node): node is OrganizationType => node !== undefined);
        if (!organizations?.length)
          return;
        setOrganizationOptions(organizations);
      }
    }
  );

  // list projects
  const {
    data: listProjectsData,
    loading: listProjectsLoading,
  } = useQuery(
    LIST_PROJECTS_QUERY, {
      variables: {
        organization: organizationId
      },
      onCompleted: data => {
        const projects = data.listProjects?.edges.map((edge) => edge?.node)
          .filter((node): node is ProjectType => node !== undefined);
        if (!projects?.length)
          return;
        setProjectOptions(projects);
      }
    }
  );

  // list operations
  const {
    data: listOperationsData,
    loading: listOperationsLoading,
  } = useQuery(
    LIST_OPERATIONS_QUERY, {
      variables: {
        organization: organizationId
      },
      onCompleted: data => {
        const operations = data.listOperations?.edges.map((edge) => edge?.node)
          .filter((node): node is OperationType => node !== undefined);
        if (!operations?.length)
          return;
        setOperationOptions(operations);
      }
    }
  );

  const options: AceType['instance'][] = [
    ... organizationOptions,
    ... projectOptions,
    ... operationOptions,
  ];

  // return
  return (
    <Form handleSubmit={() => {}} error={undefined}>

      <FormControl
        margin="normal"
        fullWidth
        sx={{ minWidth: { 'sm': '500px' } }}
        required
      >
        <Autocomplete
          id="object"
          size="small"
          options={options}
          getOptionLabel={ace => ace.name || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          // getOptionDisabled={getOptionDisabled}
          groupBy={ace => {
            switch (ace.__typename) {
              case "OrganizationType": return "Organization";
              case "ProjectType": return "Project";
              case "OperationType": return "Operation";
              default: return ''
            }
          }}
          value={instance || ""}
          onChange={(event: any, value: any) => {
            setInstance(value);
          }}
          renderInput={params =>
            <TextField
              {...params}
              label="Object *"
              variant="standard"
            />
          }
          renderOption={(props, ace) => {
            return (
              <li {...props} key={ace.id}>
                {ace.name}
              </li>
            )
          }}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((ace, index) => {
              return (
                <Chip
                  {...getTagProps({ index })}
                  key={ace.id}
                  label={ace.group.name + " | " + ace.name}
                  size="small"
                />
              )
            })
          }
        />
      </FormControl>

      <EnumSelect
        id="permission"
        options={GeorgaAcePermissionChoices}
        getOptionLabel={option => option.toLowerCase()}
        value={permission}
        setValue={setPermission}
        label="Permission"
        required
      />

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={!instance || !permission}
        onClick={() => {
          const newAcl = {
            id: "CREATE!" + Math.random().toString(36).substring(2,7),
            person: { id: personId },
            instance: instance,
            permission: permission,
          }
          onApply(newAcl as AceType);
          onSuccess()
        }}
      >
        {"Apply"}
      </Button>
    </Form>
  );
}

export default AceForm;
