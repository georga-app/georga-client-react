/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import Typography from "@mui/material/Typography";

function FormFieldError({error}: {error: string[] | undefined}) {
  if (typeof error === 'undefined')
    error = [];
  return (
    <Typography
      variant="subtitle2"
      sx={{ fontSize: 13, color: "error.main" }}
    >
      {error}
    </Typography>
  );
}

export default FormFieldError;
