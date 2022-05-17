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
import Logo from "../../components/Logo";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import styles from "./style";
import api from "../../services/api";
import useAlert from "../../hooks/useAlert";
import Alert from "../../components/Alert";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { setMessage } = useAlert();
  const haveEmptyFields = Object.values(formData).some((f) => f.length === 0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setMessage({
        text: "Todos os campos precisam ser preenchidos.",
        type: "error",
      });
      return setLoading(false);
    }

    if (password !== confirmPassword) {
      setMessage({
        text: "As senhas precisam coincidir.",
        type: "error",
      });
      return setLoading(false);
    }

    try {
      await api.signUp({ name, email, password });
      setLoading(false);
      setMessage({
        text: "Usuário cadastrado com sucesso!",
        type: "success",
      });
      navigate("/login");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({
          type: "error",
          text: "Erro ao cadastrar, por favor tente novamente.",
        });
        return setLoading(false);
      }
    }
  }

  return (
    <Box sx={styles.container}>
      <Alert />
      <Logo sx={styles.logo} />
      <Typography variant="h2" component="h2">
        Cadastro
      </Typography>
      <Box sx={{ width: "100%" }}>
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
          Icon={AccountCircleIcon}
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
        <Button
          disabled={haveEmptyFields || loading}
          variant="contained"
          sx={styles.button}
          type="submit"
        >
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
