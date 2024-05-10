/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useEffect, useContext } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import ExtLink from '@mui/material/Link'
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SocialGitHubIcon } from "@/theme/Icons";
import { SocialLinkIcon } from "@/theme/Icons";
import { SocialTwitterIcon } from "@/theme/Icons";

import UserContext from "@/provider/User";
import OneColumn from '@/theme/layouts/OneColumn';

function Home() {
  const router = useRouter();
  const user = useContext(UserContext);
  useEffect(() => {
    if(user.isLoggedIn)
      router.replace("/missions")
  });

  if (user.isLoggedIn)
    return <OneColumn><></></OneColumn>;

  return (
    <OneColumn bg='admin'>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          marginX: {
            xs: 1,
            md: "auto"
          },
          width: {
            xs: "auto",
            md: 400
          },
        }}
      >
        <Typography variant="h6">Geographic Resource & Group Allocation</Typography>
        <Typography variant="caption" sx={{ m: 0.2, mt: 1, textAlign: "justify" }}>
          Enable easy participation by volunteers and uncomplicated administration for
          your short-term needs in your humanitarian aid charity, association or project.
        </Typography>
        <ButtonGroup variant="contained" aria-label="outlined button group" sx={{ my: 2 }}>
          <Button color="primary" href="/register" component={Link}>
            Register
          </Button>
          <Button color="secondary" href="/login" component={Link}>
            Login
          </Button>
        </ButtonGroup>
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          marginX: {
            xs: 1,
            md: "auto"
          },
          width: {
            xs: "auto",
            md: 400
          },
        }}
      >
        <Stack direction="row" spacing={2}>
          <ExtLink href="https://georga.app">
            <Avatar>
              <SocialLinkIcon />
            </Avatar>
          </ExtLink>
          <ExtLink href="https://twitter.com/GeoRGA_app">
            <Avatar>
              <SocialTwitterIcon />
            </Avatar>
          </ExtLink>
          <ExtLink href="https://github.com/georga-app">
            <Avatar>
              <SocialGitHubIcon />
            </Avatar>
          </ExtLink>
        </Stack>
      </Box>
    </OneColumn>
  )
}

export default Home;
