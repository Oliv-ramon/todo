import EmailIcon from "@mui/icons-material/Email";
import { Box, Divider, Link as StyledLink, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import api from "../../services/api";
import useAlert from "../../hooks/useAlert";
import Alert from "../../components/Alert";
import { mapLoginErrorMessages } from "../../utils/alertUtils";
import useAuth from "../../hooks/useAuth";
import { styles } from "../SignUp";
import { StyledButton } from "../../components";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setMessage } = useAlert();
  const { auth, login } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    const { email, password } = formData;

    if (!email || !password) {
      setMessage({
        text: "Todos os campos precisam ser preenchidos.",
        type: "error",
      });
      return setLoading(false);
    }

    try {
      const { data: auth } = await api.signIn(formData);
      console.log(auth);
      login(auth);
      setLoading(false);
      navigate("/app/today");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        const errorMessage = mapLoginErrorMessages(error.code);
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
        Login
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
        <PasswordInput
          name="password"
          sx={styles.input}
          placeholder="Senha"
          onChange={handleChange}
          value={formData.password}
        />
        <StyledButton
          fields={formData}
          loading={loading}
          loadingText="Entrando..."
        >
          Entrar
        </StyledButton>
      </Box>
      <Typography sx={{ fontWeight: "500", textAlign: "center" }}>
        Ainda não possui cadastro?
        <StyledLink component={Link} to="/" sx={{ ml: "5px" }}>
          Cadastre-se
        </StyledLink>
      </Typography>
    </Box>
  );
}
