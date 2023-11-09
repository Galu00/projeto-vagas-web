import { useState } from 'react';
import '../styles/SignUp.css'; 

export default function SignUp() {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value);

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordShown(!confirmPasswordShown);

  const cadastrar = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    console.log("Nome:", name, "Usuário:", username, "Senha:", password, "Confirmar Senha:", confirmPassword);
  };

  return (
    <div className='container'>
      <div className='card'>
        <h1>Cadastrar</h1>
        
        <div id='msgError'></div>
        <div id='msgSuccess'></div>
        
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
            value={username} 
            onChange={handleUsernameChange} 
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
          <label htmlFor="senha">Senha</label>
          <i 
            id="verSenha" 
            className="fa fa-eye" 
            aria-hidden="true" 
            onClick={togglePasswordVisibility}
          ></i>
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
          <label htmlFor="confirmSenha">Confirmar Senha</label>
          <i 
            id="verConfirmSenha" 
            className="fa fa-eye" 
            aria-hidden="true" 
            onClick={toggleConfirmPasswordVisibility}
          ></i>
        </div>
        
        <div className='justify-center'>
          <button onClick={cadastrar}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}
