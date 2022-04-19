import Typography from "@mui/material/Typography";

function FormFieldError(props) {
  return (
    <Typography
      variant="subtitle2"
      sx={{ fontSize: 13, color: "error.main" }}
    >
      {props.error}
    </Typography>
  );
}

export default FormFieldError;
