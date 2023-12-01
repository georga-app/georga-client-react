/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function OneColumn({
  children,
  bg = 'bright',
}: {
  children: React.ReactNode,
  bg?: string
}) {
  return (
    <Box sx={{
      flexGrow: 1,
      paddingBottom: 2,
      backgroundColor: 'background.' + bg,
    }}>
      <Container maxWidth="lg" sx={{ paddingTop: { xs: 1, sm: 2 }, paddingBottom: 4 }}>
        {children}
      </Container>
    </Box>
  );
}

export default OneColumn;
