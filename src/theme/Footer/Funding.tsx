/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import Image from 'next/image'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Funding() {
  return (
    <Box sx={{ paddingY: 5, bgcolor: 'background.dark' }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ mt: '3px', height: 120 }}>
          <Image
            src="/logo-bmbf.svg"
            alt="BMBF Logo"
            width={170}
            height={120}
            priority
          />
        </Box>
        <Box sx={{ mt: '3px', height: 120 }}>
          <Image
            src="/logo-prototypefund.svg"
            alt="Prototype Fund Logo"
            width={72}
            height={120}
            priority
          />
        </Box>
      </Stack>
      <Box sx={{ paddingY: 2, color: "#999" }}>
        <Typography variant="subtitle2" align="center">
          Gefördert vom Bundesministerium für Bildung und Forschung
          und unterstützt vom Protoype Fund
        </Typography>
        <Typography variant="subtitle2" align="center">
          Prototype Fund Runde 11 | 03/2022 – 08/2022 | Förderkennzeichen 01IS22S18
        </Typography>
      </Box>
    </Box>
  );
}

export default Funding;
