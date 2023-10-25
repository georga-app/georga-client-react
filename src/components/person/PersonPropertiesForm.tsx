/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import Image from "next/image";
import { useQuery, useMutation } from '@apollo/client';

// import Autocomplete from '@mui/material/Autocomplete';
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
// import Checkbox from '@mui/material/Checkbox';
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Input from "@mui/material/Input";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import Select from '@mui/material/Select';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Snackbar from '@mui/material/Snackbar';
// import Switch from '@mui/material/Switch';
// import TextField from '@mui/material/TextField';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Alert from "@/components/shared/Alert";
import FormFieldError from "@/components/shared/FormFieldError";
import FormError from "@/components/shared/FormError";

import { gql } from '@/__generated__/gql';
// import { OrganizationType } from '@/__generated__/graphql';
import { PersonPropertyGroupTypeConnection } from '@/__generated__/graphql';
import { PersonPropertiesFormErrors } from "@/types/FormErrors";

// import { GET_PERSON_ORGANIZATIONS_QUERY } from "@/components/person/OrganizationsTable"
import { Typography } from "@mui/material";

const LIST_PERSON_PROPERTY_GROUPS_QUERY = gql(`
  query ListPersonPropertyGroups (
    $organization: ID
  ) {
    listPersonPropertyGroups (
      organization: $organization
    ) {
      edges {
        node {
          id
          codename
          name
          selectionType
          personpropertySet {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`);

const GET_PERSON_PROFILE_QUERY = gql(`
  query GetPersonProfile {
    getPersonProfile {
      firstName
      lastName
      email
      occupation
      street
      number
      postalCode
      city
      privatePhone
      mobilePhone
      onlyJobRelatedTopics
    }
  }
`);

const UPDATE_PERSON_PROFILE_MUTATION = gql(`
  mutation UpdatePersonProfile (
    $firstName: String
    $lastName: String
    $occupation: String
    $street: String
    $number: String
    $postalCode: String
    $city: String
    $privatePhone: String
    $mobilePhone: String
    $onlyJobRelatedTopics: String
  ) {
    updatePersonProfile (
      input: {
        firstName: $firstName
        lastName: $lastName
        occupation: $occupation
        street: $street
        number: $number
        postalCode: $postalCode
        city: $city
        privatePhone: $privatePhone
        mobilePhone: $mobilePhone
        onlyJobRelatedTopics: $onlyJobRelatedTopics
      }
    ) {
      person {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function PersonPropertiesForm({
  organizationId,
}: {
  organizationId: string,
}) {
  const [success, setSuccess] = useState(false);
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<PersonPropertiesFormErrors>({});

  // fields
  const [propertyGroups, setPropertyGroups] = useState<PersonPropertyGroupTypeConnection>();
  const [properties, setProperties] = useState<{id?: string[]}>({});

  // listPersonPropertyGroups
  const {
    called: propertyGroupsCalled,
    loading: propertyGroupsLoading,
    data: propertyGroupsData,
    error: propertyGroupsError
  } = useQuery(
    LIST_PERSON_PROPERTY_GROUPS_QUERY, {
      skip: !organizationId,
      variables: {
        organization: organizationId
      },
      onCompleted: data => {
        setPropertyGroups(data.listPersonPropertyGroups as PersonPropertyGroupTypeConnection)
      },
    },
  );

  // change
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { name, value },
    } = event;
    setProperties({
      ... properties,
      [name]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Errors */}
      {/*<FormError error={errors.form}/>*/}

      {/* Fields */}
      {propertyGroups?.edges.map((groupEdge) => {
        let group = groupEdge?.node;
        if (!group) return;
        return (
          <FormControl
            key={group.id + '-control'}
            margin="normal"
            // error={Boolean(errors.firstName)}
            fullWidth
          >
            <InputLabel id={group.id + '-label'}>{group.name}</InputLabel>
            <Select
              labelId={group.id + '-label'}
              id={group.id}
              name={group.id}
              multiple
              value={properties[group.id] || []}
              onChange={handleChange}
              input={<OutlinedInput id={group.id + '-input'} label={group.name} />}
              renderValue={(selected: unknown) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as Array<number>).map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {group.personpropertySet.edges.map((propertyEdge) => {
                let property = propertyEdge?.node;
                if (!property || !property.name) return;
                return (
                  <MenuItem
                    key={property.id}
                    value={property.name}
                  >
                    {property.name}
                  </MenuItem>
                )
              })}
            </Select>
            {/*<FormFieldError error={errors.lastName}/>*/}
          </FormControl>
        )
      })}
    </form>
  )

}

export default PersonPropertiesForm;
