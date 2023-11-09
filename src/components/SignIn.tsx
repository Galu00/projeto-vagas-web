import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";

interface User {
  nome: string;
  user: string;
  senha: string;
}

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const entrar = () => {
    const listaUser: User[] = JSON.parse(
      localStorage.getItem("listaUser") || "[]"
    );
    const userValid = listaUser.find(
      (user) => user.user === username && user.senha === password
    );

    if (userValid) {
      const mathRandom = Math.random().toString(16).substr(2);
      const token = mathRandom + mathRandom;
      localStorage.setItem("token", token);
      localStorage.setItem("userLogado", JSON.stringify(userValid));
      navigate("/");
    } else {
      setErrorMessage("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Entrar</h1>
        {errorMessage && (
          <div id="msgError" style={{ color: "red" }}>
            {errorMessage}
          </div>
        )}
        <div className="label-float">
          <input
            type="text"
            id="usuario"
            placeholder=" "
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ borderColor: errorMessage ? "red" : undefined }}
          />
          <label
            htmlFor="usuario"
            style={{ color: errorMessage ? "red" : undefined }}
          >
            Usuário
          </label>
        </div>
        <div className="label-float">
          <input
            type={passwordShown ? "text" : "password"}
            id="senha"
            placeholder=" "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderColor: errorMessage ? "red" : undefined }}
          />
          <label
            htmlFor="senha"
            style={{ color: errorMessage ? "red" : undefined }}
          >
            Senha
          </label>
          <i
            className="fa fa-eye"
            aria-hidden="true"
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="justify-center">
          <button onClick={entrar}>Entrar</button>
        </div>
        {/* Outros elementos do formulário */}
      </div>
    </div>
  );
};
