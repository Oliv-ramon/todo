import { Box, Button, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import styles from "./style";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const { name, email, password, confirmPassword } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
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
    <Box
      sx={styles.container}
    >
      <Box 
        component="form"
        sx={styles.form}  
        onSubmit={handleSubmit}
      >
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          size="small"
          sx={styles.input}
          onChange={handleChange}
        />
        <TextField
          name="name"
          label="Nome"
          type="text"
          variant="outlined"
          size="small"
          sx={styles.input}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Senha"
          type="password"
          variant="outlined"
          size="small"
          sx={styles.input}
          onChange={handleChange}
        />
        <TextField
          name="confirmPassword"
          label="Confirme sua senha"
          type="password"
          variant="outlined"
          size="small"
          sx={styles.input}
          onChange={handleChange}
        />
        <Button 
          variant="contained"
          size="small"  
          sx={styles.button}
          type="submit"
        >
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
}