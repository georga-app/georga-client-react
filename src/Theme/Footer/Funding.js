
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ReactComponent as LogoPrototypeFund } from '../../Images/logo-prototypefund.svg';
import { ReactComponent as LogoBMBF } from '../../Images/logo-bmbf.svg';

function Funding() {
  return (
    <Box sx={{ paddingY: 5, bgcolor: 'background.dark' }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ mt: '3px', height: 120 }}>
          <LogoBMBF alt="BMBF Logo" style={{ width: 'auto', height: '100%' }} />
        </Box>
        <Box sx={{ mt: '3px', height: 120 }}>
          <LogoPrototypeFund alt="Protoype Fund Logo" style={{ width: 'auto', height: '100%' }} />
        </Box>
      </Stack>
      <Box sx={{ paddingY: 2, color: "#999" }}>
        <Typography variant="subtitle2" align="center">
          Gefördert vom Bundesministerium für Bildung und Forschung
          und unterstützt vom Protoype Fund
        </Typography>
        <Typography variant="subtitle2" align="center">
          Prototype Fund Runde 11 | 03/2021 – 08/2022 | Förderkennzeichen 01IS22S18
        </Typography>
      </Box>
    </Box>
  );
}

export default Funding;
