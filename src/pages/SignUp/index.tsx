import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Divider, Link as StyledLink, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Logo,
  GoogleLoginButton,
  Alert,
  StyledButton,
} from "../../components";
import api from "../../services/api";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import { mapSignUpErrorMessages } from "../../utils/alertUtils";
import { SxProps } from "@mui/material";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { setMessage } = useAlert();
  const { auth } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    const { name, email, password, confirmPassword } = formData;

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
        const errorMessage = mapSignUpErrorMessages(error.code);
        setMessage({
          type: "error",
          text: errorMessage,
        });
        return setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (auth?.token) return navigate("/app/today");
  }, []);

  return (
    <Box sx={styles.container}>
      <Alert />
      <Logo />
      <Typography variant="h2" component="h2">
        Cadastro
      </Typography>
      <Box sx={{ width: "100%" }}>
        <GoogleLoginButton />
        <Divider sx={{ width: "100%", py: "15px" }}>ou</Divider>
      </Box>

      <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Nome"
          value={formData.name}
          type="text"
          sx={styles.input}
          onChange={handleChange}
          Icon={AccountCircleIcon}
        />
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          type="email"
          sx={styles.input}
          onChange={handleChange}
          Icon={EmailIcon}
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
        <StyledButton
          loading={loading}
          loadingText="Cadastrando..."
          fields={formData}
        >
          Cadastrar
        </StyledButton>
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

interface SignUpStyles {
  container: SxProps;
  form: SxProps;
  input: SxProps;
  button: SxProps;
}

export const styles: SignUpStyles = {
  container: {
    minHeight: "100vh",
    padding: "60px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background:
      "linear-gradient(rgba(11,70,1,1) 0%, rgba(9,45,1,1) 12%, rgba(6,28,1,1) 25%, rgba(1,8,1,1) 60%, rgba(0,5,0,1) 100%);",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "Commissioner",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    my: "20px",
    fontSize: "16px",
    color: "#fff",
  },
};
