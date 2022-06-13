import { Button, CircularProgress, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
  loading: boolean;
  loadingText: string;
  fields: any;
}

export default function StyledButton({
  loading,
  loadingText,
  children,
  fields,
}: Props) {
  const haveEmptyFields = Object.values(fields).some((f) => !f);

  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      disabled={haveEmptyFields || loading}
      sx={{
        width: "100%",
        minHeight: "44px",
        my: "20px",
        fontSize: "16px",
        color: "#fff",
      }}
    >
      {loading ? (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "16px",
          }}
        >
          {loadingText} <CircularProgress sx={{ color: "white" }} size={16} />
        </Typography>
      ) : (
        children
      )}
    </Button>
  );
}
