import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Button,
  Divider,
  Link as StyledLink,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import Input from "../../components/Input";
import api from "../../services/api";
import styles from "./style";
import { AccountCircle } from "@mui/icons-material";
import Logo from "../../components/Logo";
import GoogleLoginButton from "../../components/GoogleLoginButton";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const showPassword = true;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      console.log("Todos os campos precisam ser preenchidos");
      return;
    }

    if (password !== confirmPassword) {
      console.log("As senhas precisam coincidir");
      return;
    }

    try {
      await api.signUp({ name, email, password });
      console.log("Usuário cadastrado com sucesso");
      navigate("/login");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        console.log("Erro ao cadastrar, por favor, tente novamente");
        return;
      }
    }
  }

  return (
    <Box sx={styles.container}>
      <Logo sx={styles.logo} />
      <Typography component="h2" sx={styles.h2}>
        Cadastro
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <GoogleLoginButton />
        <Divider sx={{ width: "100%", py: "15px" }}>ou</Divider>
      </Box>

      <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          type="email"
          sx={styles.input}
          onChange={handleChange}
          Icon={EmailIcon}
        />
        <Input
          name="name"
          placeholder="Nome"
          value={formData.name}
          type="text"
          sx={styles.input}
          onChange={handleChange}
          Icon={AccountCircle}
        />
        <PasswordInput
          name="password"
          sx={styles.input}
          placeholder="Senha"
          onChange={handleChange}
          value={formData.password}
        />
        <PasswordInput
          name="confirmPassword"
          sx={styles.input}
          placeholder="Confirme sua senha"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        <Button variant="contained" sx={styles.button} type="submit">
          <Typography sx={{ fontWeight: "bold" }}>Cadastrar</Typography>
        </Button>
      </Box>
      <Typography sx={{ fontWeight: "500" }}>
        Já possui cadastro?
        <StyledLink component={Link} to="login" sx={{ ml: "5px" }}>
          Login
        </StyledLink>
      </Typography>
    </Box>
  );
}
