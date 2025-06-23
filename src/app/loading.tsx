'client-only';

import Grid from '@mui/material/Grid';
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
      return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
        >
            <CircularProgress color="secondary" />
    </Grid>    
  );
}