import CustomInput from "../../../components/customInput";
import { Header, Actions, Card, LinkedContainer, LinkedText, ButtonAuth } from "../style";
import { loginAuth } from "../../../services/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export function Login({ onRegister }: { onRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginData = {
    email,
    password,
  };

  const { login } = useAuth();

const handleLogin = async () => {
  try {
    const response = await loginAuth(loginData);
    const userData = response?.user ?? response;
    if (login) login(userData);
    navigate("/home");
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    }
  }
};

  return (
    <Card>
      <Header>
        <h2>Bem-vindo de volta</h2>
        <p>Entre na sua conta para continuar</p>
      </Header>

      <CustomInput label="Email" type="email" placeholder="seu@exemplo.com" onChange={(e) => setEmail(e.target.value)} />
      <CustomInput label="Senha" type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
      {error && <div style={{ color: "red", fontSize: 13, textAlign: "center", justifyContent: "center", width: "100%", display: "flex" }}>{error}</div>}

      <Actions>
        <ButtonAuth
        onClick={() => handleLogin() }
        >
          Entrar
        </ButtonAuth>
        <LinkedContainer>
          Ainda não tem conta? <LinkedText onClick={onRegister}>Cadastre-se</LinkedText>
        </LinkedContainer>
      </Actions>
    </Card>
  );
}