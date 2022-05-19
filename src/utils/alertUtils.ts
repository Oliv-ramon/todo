type StatusCode = number;

export function mapSignUpErrorMessages(statusCode: StatusCode) {
  if (statusCode === 409) return "Esse usuário já possui cadastro.";

  return "Erro ao cadastrar, por favor, tente novamente.";
}

export function mapLoginErrorMessages(statusCode: StatusCode) {
  if (statusCode === 422) return "Email ou senha inválidos.";

  return "Erro ao fazer login, por favor, tente novamente.";
}
