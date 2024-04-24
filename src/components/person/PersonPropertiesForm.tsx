/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';

import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';

import { useSnackbar } from "@/provider/Snackbar";
import Form from "@/components/shared/Form";
import FormFieldError from "@/components/shared/FormFieldError";

import { LIST_PERSON_PROPERTY_GROUPS_QUERY } from '@/gql/personPropertyGroup';
import {
  GET_PERSON_PROFILE_PROPERTIES_QUERY,
  UPDATE_PERSON_PROFILE_PROPERTIES_MUTATION,
} from '@/gql/person';

import {
  PersonPropertyType,
  PersonPropertyGroupType,
  UpdatePersonProfilePropertiesMutation,
  UpdatePersonProfilePropertiesMutationVariables,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";
import { onlyType } from "@/types/Util";

type PersonPropertyGroupDataType = {
  [id: string]: string[]
}

function PersonPropertyGroupField({
  group,
  properties,
  setProperties,
  changed,
  setChanged,
} : {
  group: PersonPropertyGroupType,
  properties: PersonPropertyGroupDataType,
  setProperties: React.Dispatch<React.SetStateAction<PersonPropertyGroupDataType>>
  changed: PersonPropertyGroupDataType,
  setChanged: React.Dispatch<React.SetStateAction<PersonPropertyGroupDataType>>
}) {

  // states
  const [type, setType] = useState<PersonPropertyGroupType['selectionType']>();
  const [options, setOptions] = useState<PersonPropertyType[]>([]);

  // effects
  useEffect(() => {
    const newOptions = group.personpropertySet.edges
      .map(edge => edge?.node)
      .filter(onlyType)
    setOptions(newOptions);
    setType(group.selectionType);
  }, [group.personpropertySet.edges, group.selectionType])

  // change
  const arrayEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((element, index) => element === b[index]);
  const handleChanged = (key: string, oldValue: string[], newValue: string[]) => {
    if (!oldValue)
      oldValue = []
    if (!(key in changed))
      return setChanged({[key]: oldValue, ...changed});
    if (arrayEqual(changed[key], newValue))
      setChanged(({[key]: _, ...updated}) => updated);
  };

  // return
  return (
    <FormControl
      key={group.id + '-control'}
      margin="normal"
      fullWidth
    >
      <Autocomplete
        id={group.id}
        size="small"
        multiple={type === "MULTISELECT"}
        disableCloseOnSelect={type === "MULTISELECT"}
        filterSelectedOptions
        options={options.map(option => option.id)}
        getOptionLabel={optionId => options.find(option => option.id == optionId)?.name || ''}
        value={
          type === "MULTISELECT"
            ? properties[group.id] || []
            : properties[group.id]?.length === 1
              ? properties[group.id][0]
              : null
        }
        onChange={(event: any, value: any) => {
          switch(type) {
            case "SINGLESELECT": value = [value]; break;
          }
          handleChanged(group.id, properties[group.id], value);
          setProperties({ ... properties, [group.id as string]: value });
        }}
        renderInput={params =>
          <TextField
            {...params}
            label={group.name}
          />
        }
        renderOption={(props, optionId) => {
          const property = options.find(option => option.id === optionId);
          if (!property) return;
          return (
            <li {...props} key={property.id}>
              {property.name}
            </li>
          )
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((optionId, index) => {
            const property = options.find(option => option.id === optionId);
            if (!property) return;
            return (
              <Chip
                {...getTagProps({ index })}
                key={property.id}
                label={property.name}
                size="small"
              />
            )
          })
        }
      />
    </FormControl>
  )
}

type Errors = FormErrors<UpdatePersonProfilePropertiesMutationVariables>;

function PersonPropertiesForm({
  organizationId,
  onSuccess = () => undefined,
  onError = () => undefined,
}: {
  organizationId: string,
  onSuccess?: (data: UpdatePersonProfilePropertiesMutation) => void,
  onError?: (data: UpdatePersonProfilePropertiesMutation) => void,
}) {
  // context
  const snackbar = useSnackbar();

  // states
  const [changed, setChanged] = useState<PersonPropertyGroupDataType>({});
  const [errors, setErrors] = useState<Errors>({});

  // fields
  const [propertyGroups, setPropertyGroups] = useState<PersonPropertyGroupType[]>();
  const [properties, setProperties] = useState<PersonPropertyGroupDataType>({});

  // getPersonProfileProperties
  const {
    called: getPersonProfilePropertiesCalled,
    loading: getPersonProfilePropertiesLoading,
    data: getPersonProfilePropertiesData,
    error: getPersonProfilePropertiesError
  } = useQuery(
    GET_PERSON_PROFILE_PROPERTIES_QUERY, {
      onCompleted: data => {
        if (!data.getPersonProfile)
          return;
        let initialProperties: PersonPropertyGroupDataType = {};
        data.getPersonProfile.properties.edges.forEach(edge => {
          const propertyId = edge?.node?.id;
          if (!propertyId)
            return;
          const groupId = edge?.node?.group.id;
          if (!groupId)
            return;
          if (!(groupId in initialProperties))
            initialProperties[groupId] = [];
          initialProperties[groupId].push(propertyId);
        })
        setProperties(initialProperties);
      },
    },
  );

  // listPersonPropertyGroups
  const {
    called: listPersonPropertyGroupsCalled,
    loading: listPersonPropertyGroupsLoading,
    data: listPersonPropertyGroupsData,
    error: listPersonPropertyGroupsError
  } = useQuery(
    LIST_PERSON_PROPERTY_GROUPS_QUERY, {
      skip: !organizationId,
      variables: {
        organization: organizationId
      },
      onCompleted: data => {
        if (!data.listPersonPropertyGroups) return;
        const groups = data.listPersonPropertyGroups.edges
          .map(edge => edge?.node)
          .filter(onlyType);
        setPropertyGroups(groups as PersonPropertyGroupType[]);
      },
    },
  );

  // updatePersonProfileProperties
  const [ updatePersonProperties, {
    loading: updatePersonPropertiesLoading,
    reset: updatePersonPropertiesReset
  }] = useMutation(
    UPDATE_PERSON_PROFILE_PROPERTIES_MUTATION, {
      onCompleted: data => {
        const response = data.updatePersonProfile;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updatePersonPropertiesReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Qualifications updated", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updatePersonPropertiesReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "GetPersonProfileProperties"
      ]
    }
  );
  // updatePersonPropertyGroups
  let updatePropertiesLoading = false;

  // submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePersonProperties({
      variables: {
        properties: Object.values(properties).flat()
      }
    });
  }

  // return
  return (
    <Form handleSubmit={handleSubmit} error={errors.form}>

      {/* Errors */}
      <FormFieldError error={errors.properties}/>

      {/* Fields */}
      {propertyGroups?.map(group =>
        <PersonPropertyGroupField
          key={group.id}
          group={group}
          properties={properties}
          setProperties={setProperties}
          changed={changed}
          setChanged={setChanged}
        />
      )}

      {/* Controls */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={
          getPersonProfilePropertiesLoading
          || Object.keys(changed).length === 0
        }
      >
        {updatePropertiesLoading ? "Saving..." : "Save"}
      </Button>

    </Form>
  )

}

export default PersonPropertiesForm;
export { PersonPropertyGroupField }
export type { PersonPropertyGroupDataType }
