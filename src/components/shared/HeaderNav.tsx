/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import Link from "next/link";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { NavigationBackIcon } from '@/theme/Icons';

function HeaderNav({
  title,
  back
}: {
  title: string,
  back: string
}) {
  return (
    <Stack direction="row" sx={{ padding: 1 }}>
      <Link href={back} aria-label="back">
        <Button variant="text" sx={{ padding: "3px", minWidth: "30px" }}>
          <NavigationBackIcon color="secondary" />
        </Button>
      </Link>
      <Typography
        component="h1"
        variant="h5"
        align="left"
        color="secondary"
        sx={{ marginLeft: "5px" }}
      >
        {title}
      </Typography>
    </Stack>
  )
}

export default HeaderNav;
