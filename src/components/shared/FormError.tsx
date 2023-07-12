import Typography from "@mui/material/Typography";

function FormError({error}: {error: string | undefined}) {
  if (typeof error === 'undefined')
    error = '';
  return (
    <Typography
      variant="subtitle2"
      sx={{ fontSize: 13, color: "error.main", textAlign: "center", marginTop: 1 }}
    >
      {error}
    </Typography>
  );
}

export default FormError;
