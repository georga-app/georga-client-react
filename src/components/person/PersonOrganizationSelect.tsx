/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import Image from "next/image";
import { useQuery } from '@apollo/client';

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';
import Typography from "@mui/material/Typography";

import { OrganizationType } from '@/__generated__/graphql';

import { GET_PERSON_ORGANIZATIONS_QUERY } from "@/components/person/OrganizationsTable"

function PersonOrganizationSelect({
  organizationId,
  setOrganizationId,
}: {
  organizationId: string,
  setOrganizationId: React.Dispatch<React.SetStateAction<string>>,
}) {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);

  // getPersonOrganizations
  const { data, loading } = useQuery(GET_PERSON_ORGANIZATIONS_QUERY, {
    'onCompleted': data => {
      if (!data?.getPersonProfile?.organizationsSubscribed.edges) return;
      const orgs = data.getPersonProfile.organizationsSubscribed.edges
        .map((edge) => edge?.node)
        .filter((node): node is OrganizationType => node !== undefined)
      if (!orgs) return;
      setOrganizations(orgs);
      setOrganizationId(orgs[0].id);
    }
  });

  return (
    <FormControl
      margin="normal"
      variant="standard"
      fullWidth
    >
      <InputLabel htmlFor="organization">Organization</InputLabel>
      <Select
        labelId="organization"
        id="organization"
        value={organizationId}
        label="Age"
        onChange={event => setOrganizationId(event.target.value)}
      >
        {organizations.map((item: OrganizationType) => (
          <MenuItem
            key={item.id}
            value={item.id}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Image
                alt="logo"
                src={'data:image/png;base64,' + item.icon as string}
                height={30}
                width={30}
              />
              <Typography sx={{ padding: '3px' }}>{item.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

}

export default PersonOrganizationSelect;
