/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import Link, { LinkProps } from "next/link";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { NavigationBackIcon, NavigationForwardIcon } from '@/theme/Icons';

function HeaderNav({
  currentLabel,
  backUrl,
  backLabel,
  forwardUrl,
  forwardLabel,
}: {
  currentLabel?: string,
  backUrl?: LinkProps['href'],
  backLabel?: string,
  forwardUrl?: LinkProps['href'],
  forwardLabel?: string,
}) {
  return (
    <Stack direction="row" sx={{ padding: 1 }}>
      {backUrl &&
        <Box sx={{ display: 'flex', marginRight: '5px' }}>
          <Link href={backUrl} aria-label="back">
            <Button variant="text" sx={{
              paddingY: "3px",
              paddingX: { xs: 1, sm: 2 },
              minWidth: "30px",
              marginRight: 1,
              textTransform: 'none',
              color: "#999",
            }}>
              <NavigationBackIcon />
              {backLabel &&
                <Typography
                  variant="h5"
                  sx={{ marginLeft: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  {backLabel}
                </Typography>
              }
            </Button>
          </Link>
        </Box>
      }
      {currentLabel &&
        <Typography
          component="h1"
          variant="h5"
          color="secondary"
          sx={{
            flexGrow: 1,
            textAlign: backLabel ? "center" : "left",
          }}
        >
          {currentLabel}
        </Typography>
      }
      {forwardUrl &&
        <Box sx={{ display: 'flex', marginLeft: '5px' }}>
          <Link href={forwardUrl} aria-label="forward">
            <Button variant="text" sx={{
              paddingY: "3px",
              paddingX: { xs: 1, sm: 2 },
              minWidth: "30px",
              marginLeft: 1,
              textTransform: 'none',
              color: "#999",
            }}>
              {forwardLabel &&
                <Typography
                  variant="h5"
                  sx={{ marginRight: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  {forwardLabel}
                </Typography>
              }
              <NavigationForwardIcon />
            </Button>
          </Link>
        </Box>
      }
    </Stack>
  )
}

export default HeaderNav;
