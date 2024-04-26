/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect, useContext } from 'react';
import Image from "next/image";
import { useQuery } from '@apollo/client';

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useFilter } from '@/provider/Filter';

import { MenuOrganizationIcon } from '@/theme/Icons';

import { GET_PERSON_ORGANIZATIONS_QUERY } from "@/gql/organization"

import { OrganizationType } from '@/types/__generated__/graphql';

function OrganizationLetter({
  name,
}: {
  name: string
}) {
  return <Box sx={{
    backgroundColor: 'primary.light',
    width: '20px',
    height: '20px',
    borderRadius: '10px',
  }} >
    <Typography sx={{
      position: 'relative',
      top: '-2px',
      left: '1px'
    }}>
      {name[0]}
    </Typography>
  </Box>
}

function OrganizationIcon({
  activeId,
  organizations,
}: {
  activeId: string,
  organizations: OrganizationType[],
}) {
  const [organization] = organizations.filter(organization => organization.id === activeId);
  if (organization) {
    if (organization.icon)
      return <Avatar
        alt=""
        src={'data:image/png;base64,' + organization.icon as string}
        sx={{ height: 20, width: 20, border: '1px solid #aaa' }}
      />
      return <OrganizationLetter name={organization.name} />
  }
  return <OrganizationLetter name={" "} />
}

function OrganizationMenu() {
  // provider
  const filter = useFilter();

  // states
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [anchorElOrganization, setAnchorElOrganization] = useState<null | HTMLElement>(null);

  // get person organizations
  const { data, called, loading } = useQuery(GET_PERSON_ORGANIZATIONS_QUERY, {
    'onCompleted': data => {
      if (!data?.getPersonProfile?.organizationsSubscribed.edges) return;
      const orgs = data.getPersonProfile.organizationsSubscribed.edges
        .map((edge) => edge?.node)
        .filter((node): node is OrganizationType => node !== undefined)
      if (!orgs) return;
      setOrganizations(orgs);
    }
  });

  // effects
  useEffect(() => {
    if (!organizations.length || filter.organization)
      return;
    if (!!localStorage.getItem("globalOrganization")) {
      filter.setOrganization(localStorage.getItem("globalOrganization") || "")
    } else {
      filter.setOrganization(organizations[0].id)
    }
  }, [organizations, filter])

  // handlers
  const handleOpenOrganizationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElOrganization(event.currentTarget);
  };
  const handleCloseOrganizationMenu = () => { setAnchorElOrganization(null); };

  // return
  if (organizations.length < 2)
    return <></>
  return <>
    <IconButton
      aria-label="Organization menue"
      aria-controls="menu-organization"
      aria-haspopup="true"
      onClick={handleOpenOrganizationMenu}
      color="inherit"
    >
      <OrganizationIcon
        organizations={organizations}
        activeId={filter.organization}
      />
    </IconButton>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-organization"
      anchorEl={anchorElOrganization}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElOrganization)}
      onClose={handleCloseOrganizationMenu}
    >
      {organizations.map(organization =>
        <MenuItem
          key={'filter-organization-' + organization.id}
          onClick={() => {
            filter.setOrganization(organization.id);
            handleCloseOrganizationMenu();
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {organization.icon
              ? <Image
                  alt="logo"
                  src={'data:image/png;base64,' + organization.icon as string}
                  height={30}
                  width={30}
                />
              : <Typography
                sx={{ width: '30px', fontSize: '20px', paddingLeft: '8px' }}
                >
                  {organization.name[0]}
                </Typography>
            }
            <Typography sx={{ padding: '3px' }}>{organization.name}</Typography>
          </Box>
        </MenuItem>
      )}
    </Menu>
  </>;
}

export default OrganizationMenu;
