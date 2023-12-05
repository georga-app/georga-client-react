/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ConstructionIcon } from '@/theme/Icons';

function UnderConstruction({
  label
}: {
  label?: string
}) {
  return (
    <Box sx={{ marginY: 5, display: 'flex', justifyContent: 'center' }}>
      <Box>
        <ConstructionIcon sx={{ fontSize: '200px', color: '#ccc' }} />
        {label &&
          <Typography
            variant="h4"
            sx={{ color: '#ccc', marginLeft: "6px", textAlign: 'center' }}
          >{label}</Typography>
        }
      </Box>
    </Box>
  );
}

export default UnderConstruction;
