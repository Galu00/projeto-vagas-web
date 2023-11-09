import { useState } from "react";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, settelefone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleNameChange = (event: any) => setName(event.target.value);
  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event: any) =>
    setConfirmPassword(event.target.value);

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordShown(!confirmPasswordShown);

  const handleRegister = async (event: any) => {
    event.preventDefault(); // Prevent the default form submit behavior

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register(name, email, password, "phoneNumber");
      navigate("/SignUp"); // Navigate to the dashboard on successful registration
    } catch (registrationError: any) {
      setError(registrationError.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Cadastrar</h1>

        {error && <div id="msgError">{error}</div>}

        <div className="label-float">
          <input
            type="text"
            id="nome"
            placeholder=" "
            required
            value={name}
            onChange={handleNameChange}
          />
          <label htmlFor="nome">Nome</label>
        </div>

        <div className="label-float">
          <input
            type="text"
            id="usuario"
            placeholder=" "
            required
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="usuario">Usuário</label>
        </div>

        <div className="label-float">
          <input
            type={passwordShown ? "text" : "password"}
            id="senha"
            placeholder=" "
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <i
            className="fa fa-eye"
            aria-hidden="true"
            onClick={togglePasswordVisibility}
          ></i>
          <label htmlFor="senha">Senha</label>
        </div>

        <div className="label-float">
          <input
            type={confirmPasswordShown ? "text" : "password"}
            id="confirmSenha"
            placeholder=" "
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <i
            className="fa fa-eye"
            aria-hidden="true"
            onClick={toggleConfirmPasswordVisibility}
          ></i>
          <label htmlFor="confirmSenha">Confirmar Senha</label>
        </div>

        <div className="justify-center">
          <button
            onClick={(event) => {
              event.preventDefault();
              register(name, email, password, telefone).catch(console.error);
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
