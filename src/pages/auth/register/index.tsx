import CustomInput from "../../../components/customInput";
import { Header, Actions, Card, LinkedText, LinkedContainer, ButtonAuth } from "../style";
import { useState } from "react";
import { registerAuth } from "../../../services/useAuth";
import type { Register } from "../../../types/Auth";

export function Register({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [error, setError] = useState("");

  const registerData : Register = {
    email,
    password,
    fullName,
    birthDate,
    monthlyIncome
  };

const handleRegister = async() => {
  try {
    await registerAuth(registerData);
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    }
  }
}

return (
    <Card>
      <Header>
        <h2>Bem-vindo de volta</h2>
        <p>Entre na sua conta para continuar</p>
      </Header>

      <CustomInput label="Email" type="email" placeholder="seu@exemplo.com" onChange={(e) => setEmail(e.target.value)} />
      <CustomInput label="Senha" type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
      <CustomInput label="Nome Completo" type="text" placeholder="Digite seu nome completo" onChange={(e) => setFullName(e.target.value)} />
      <CustomInput label="Data de Nascimento" type="date" placeholder="Digite sua data de nascimento" onChange={(e) => setBirthDate(e.target.value)} />
      <CustomInput label="Renda Mensal" type="number" placeholder="Digite sua renda mensal" onChange={(e) => setMonthlyIncome(Number(e.target.value))} />
      {error && <div style={{ color: "red", fontSize: 13, textAlign: "center", justifyContent: "center", width: "100%", display: "flex" }}>{error}</div>}

      <Actions>
        <ButtonAuth
        onClick={() => handleRegister() }
        >
          Cadastrar
        </ButtonAuth>
        <LinkedContainer>
          Ja possui uma conta? <LinkedText onClick={onLogin}>Entre</LinkedText>
        </LinkedContainer>
      </Actions>
    </Card>
  );
}