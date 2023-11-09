import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

export const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [message, setMessage] = useState({ error: "", success: "" });
  const navigate = useNavigate();

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        return value.length > 2;
      case "username":
        return value.length > 4;
      case "password":
        return value.length > 5;
      case "confirmPassword":
        return value === password;
      default:
        return false;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };

  const cadastrar = () => {
    if (
      validateField("name", name) &&
      validateField("username", username) &&
      validateField("password", password) &&
      validateField("confirmPassword", confirmPassword)
    ) {
      const listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
      listaUser.push({ nomeCad: name, userCad: username, senhaCad: password });
      localStorage.setItem("listaUser", JSON.stringify(listaUser));
      setMessage({ ...message, success: "Cadastrando usuário...", error: "" });

      setTimeout(() => {
        navigate("/signup");
      }, 2000);
    } else {
      setMessage({
        ...message,
        error: "Preencha todos os campos corretamente antes de cadastrar",
        success: "",
      });
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  return (
    <div className="container">
      <div className="card">
        <h1>Cadastrar</h1>
        {message.error && <div className="msgError">{message.error}</div>}
        {message.success && <div className="msgSuccess">{message.success}</div>}
        <div className="label-float">
          <input
            type="text"
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
          <label>Nome</label>
        </div>
        <div className="label-float">
          <input
            type="text"
            value={username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            required
          />
          <label>Usuário</label>
        </div>
        <div className="label-float">
          <input
            type={passwordShown ? "text" : "password"}
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
          />
          <label>Senha</label>
          <i
            className="fa fa-eye password-icon"
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="label-float">
          <input
            type={confirmPasswordShown ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            required
          />
          <label>Confirmar Senha</label>
          <i
            className="fa fa-eye password-icon"
            onClick={toggleConfirmPasswordVisibility}
          ></i>
        </div>
        <div className="justify-center">
          <button onClick={cadastrar}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
};
