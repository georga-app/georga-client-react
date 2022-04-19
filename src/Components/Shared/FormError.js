import Typography from "@mui/material/Typography";

function FormError(props) {
  return (
    <Typography
      variant="subtitle2"
      sx={{ fontSize: 13, color: "error.main", textAlign: "center", marginTop: 1 }}
    >
      {props.error}
    </Typography>
  );
}

export default FormError;
