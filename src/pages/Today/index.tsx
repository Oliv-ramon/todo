import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Category from "../../components/pages/Today/Category";
import useCategories from "../../hooks/api/useCategories";
import useAuth from "../../hooks/useAuth";

export default function Today() {
  const { auth } = useAuth();
  const { categories } = useCategories("today");

  return (
    <Container component="main">
      <Typography variant="h2" component="h2" sx={{ fontSize: "20px" }}>
        Bem vindo, {auth?.userName}!
      </Typography>
      <Box component="section">
        {categories?.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </Box>
    </Container>
  );
}

const Container = styled(Box)`
  height: calc(100vh - 152px);
  overflow: scroll;
`;
