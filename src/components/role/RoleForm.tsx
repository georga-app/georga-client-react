/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';

import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Form from "@/components/shared/Form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField';

import { Input, Switch } from "@/components/shared/FormFields";

import { LIST_PERSON_PROPERTIES_QUERY } from '@/gql/personProperty';

import {
  RoleType,
  RoleSpecificationType,
  OperationType,
  PersonPropertyType,
} from '@/types/__generated__/graphql';
import { onlyType } from "@/types/Util";

function PropertiesAutocomplete({
  id,
  label,
  options,
  getOptionDisabled = (property) => false,
  value,
  setValue,
} : {
  id: string,
  label: string,
  options: PersonPropertyType[],
  getOptionDisabled?: (property: PersonPropertyType) => boolean,
  value: PersonPropertyType[],
  setValue: React.Dispatch<React.SetStateAction<PersonPropertyType[]>>
}) {
  return (
    <FormControl
      key={id + '-control'}
      margin="normal"
      fullWidth
    >
      <Autocomplete
        id={id}
        size="small"
        multiple
        // disableCloseOnSelect
        options={options}
        getOptionLabel={property => property.name || ''}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionDisabled={getOptionDisabled}
        groupBy={property => property.group.name || ''}
        value={value}
        onChange={(event: any, value: any) => {
          setValue(value);
        }}
        renderInput={params =>
          <TextField
            {...params}
            label={label}
          />
        }
        renderOption={(props, property) => {
          return (
            <li {...props} key={property.id}>
              {property.name}
            </li>
          )
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((property, index) => {
            return (
              <Chip
                {...getTagProps({ index })}
                key={property.id}
                label={property.group.name + " | " + property.name}
                size="small"
              />
            )
          })
        }
      />
    </FormControl>
  )
}

function RoleForm({
  organizationId,
  role,
  onApply = (role) => undefined,
  onSuccess = () => undefined,
}: {
  organizationId: string,
  role?: RoleType,
  onApply?: (role: RoleType) => void,
  onSuccess?: () => void,
}) {
  // mode
  const create = !(role);
  const edit = (role);

  // options
  const [propertyOptions, setPropertyOptions] = useState<PersonPropertyType[]>([]);

  // fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [needsAdminAcceptance, setNeedsAdminAcceptance] = useState(false);
  const [mandatory, setMandatory] = useState<PersonPropertyType[]>([]);
  const [recommended, setRecommended] = useState<PersonPropertyType[]>([]);
  const [unrecommended, setUnrecommended] = useState<PersonPropertyType[]>([]);
  const [impossible, setImpossible] = useState<PersonPropertyType[]>([]);

  // presets
  useEffect(() => {
    if (role) {
      setName(role.name || "");
      setDescription(role.description || "");
      setQuantity(role.quantity || 0);
      setNeedsAdminAcceptance(role.needsAdminAcceptance);
      setMandatory(role.mandatory as PersonPropertyType[]);
      setRecommended(role.recommended as PersonPropertyType[]);
      setUnrecommended(role.unrecommended as PersonPropertyType[]);
      setImpossible(role.impossible as PersonPropertyType[]);
    }
  }, [role]);

  // list person properties
  const {
    called: listPersonPropertiesCalled,
    loading: listPersonPropertiesLoading,
    data: listPersonPropertiesData,
    error: listPersonPropertiesError
  } = useQuery(
    LIST_PERSON_PROPERTIES_QUERY, {
      variables: {
        group_Organization: organizationId,
      },
      onCompleted: data => {
        if (!data.listPersonProperties) return;
        const options = data.listPersonProperties.edges
          .map(edge => edge?.node)
          .filter(onlyType);
        setPropertyOptions(options as PersonPropertyType[]);
      },
    },
  );

  // return
  return (
    <Form handleSubmit={() => {}} error={undefined}>

      <Input
        id="name"
        value={name}
        setValue={setName}
        label="Name"
        required
      />
      <Input
        id="description"
        value={description}
        setValue={setDescription}
        label="Description"
      />
      <Input
        id="quantity"
        value={quantity}
        setValue={quantity => setQuantity(parseInt(quantity))}
        type="number"
        label="Quantity"
      />
      <Switch
        id="confirm"
        value={needsAdminAcceptance}
        setValue={setNeedsAdminAcceptance}
        errors={[]}
        label="Confirm"
      />

      <InputLabel sx={{ marginTop: 2, marginBottom: 1 }}>Role Specification</InputLabel>
      <PropertiesAutocomplete
        id="mandatory"
        label="Mandatory"
        options={propertyOptions}
        getOptionDisabled={option =>
          !!recommended.filter(property => option.id === property.id).length
          || !!unrecommended.filter(property => option.id === property.id).length
          || !!impossible.filter(property => option.id === property.id).length
        }
        value={mandatory}
        setValue={setMandatory}
      />
      <PropertiesAutocomplete
        id="recommended"
        label="Recommended"
        options={propertyOptions}
        getOptionDisabled={option =>
          !!mandatory.filter(property => option.id === property.id).length
          || !!unrecommended.filter(property => option.id === property.id).length
          || !!impossible.filter(property => option.id === property.id).length
        }
        value={recommended}
        setValue={setRecommended}
      />
      <PropertiesAutocomplete
        id="unrecomended"
        label="Unrecommended"
        options={propertyOptions}
        getOptionDisabled={option =>
          !!mandatory.filter(property => option.id === property.id).length
          || !!recommended.filter(property => option.id === property.id).length
          || !!impossible.filter(property => option.id === property.id).length
        }
        value={unrecommended}
        setValue={setUnrecommended}
      />
      <PropertiesAutocomplete
        id="impossible"
        label="Impossible"
        options={propertyOptions}
        getOptionDisabled={option =>
          !!mandatory.filter(property => option.id === property.id).length
          || !!recommended.filter(property => option.id === property.id).length
          || !!unrecommended.filter(property => option.id === property.id).length
        }
        value={impossible}
        setValue={setImpossible}
      />

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        onClick={() => {
          if (edit) {
            const newRole = {
              ...role,
              name: name,
              description: description,
              quantity: quantity,
              needsAdminAcceptance: needsAdminAcceptance,
              mandatory: mandatory,
              recommended: recommended,
              unrecommended: unrecommended,
              impossible: impossible,
            }
            onApply(newRole);
          }
          if (create) {
            const newRole = {
              id: "CREATE!" + Math.random().toString(36).substring(2,7),
              name: name,
              description: description,
              quantity: quantity,
              needsAdminAcceptance: needsAdminAcceptance,
              mandatory: mandatory,
              recommended: recommended,
              unrecommended: unrecommended,
              impossible: impossible,
              createdAt: '',
              modifiedAt: '',
              isActive: true,
              isTemplate: true,
              participantSet: {
                edges: [],
                pageInfo: {
                  hasNextPage: false,
                  hasPreviousPage: false
                }
              },
              rolespecificationSet: {
                edges: [],
                pageInfo: {
                  hasNextPage: false,
                  hasPreviousPage: false
                }
              },
            }
            onApply(newRole);
          }
          onSuccess()
        }}
      >
        {"Apply"}
      </Button>
    </Form>
  );
}

export default RoleForm;
