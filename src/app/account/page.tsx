/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import Link from "next/link";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ThreeColumns from '@/theme/layouts/ThreeColumns';
import HeaderNav from '@/components/shared/HeaderNav';

import { MenuItem } from '@/types/Menus';
import menus from '@/menus';

function Item({
  page
}: {
  page: MenuItem,
}) {
  return page.type !== 'link' ? '' : (
    <Link href={page.path} style={{ textDecoration: "none" }}>
      <Paper>
        <Button variant="text" sx= {{
          padding: 1,
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          textAlign: 'left',
          textTransform: 'none',
          justifyContent: 'flex-start',
          tabIndex: 1,
        }}>
          <Box sx={{ color: 'primary.main' }}>
            {page.icon}
          </Box>
          <Typography sx={{ width: '33%', flexShrink: 0, marginLeft: 2 }}>
            {page.name}
          </Typography>
          <Typography sx={{ color: 'text.secondary', width: { xs: '100%', sm: 'auto'} }}>
            {page.description}
          </Typography>
        </Button>
      </Paper>
    </Link>
  )
}

function Account() {
  return (
    <ThreeColumns
      bg='admin'
      middle={
        <Container sx={{ width: { xs: "auto", sm: 600 }, }}>
          <HeaderNav title="Account" back="/"/>
          <Stack spacing={0}>
            {menus.backend.account.map((page) => page.type !== 'link' ? '' : (
              <Item key={page.path} page={page} />
            ))}
          </Stack>
        </Container>
      }
    />
  )
}

export default Account;
