import { useState } from 'react';
import '../styles/SignIn.css';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown => !passwordShown);
  };

  const entrar = () => {
    console.log("Usuário:", username, "Senha:", password);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  return (
    <div className='container'>
      <div className='card'>
        <h1>Entrar</h1>

        <div id='msgError'></div>

        <div className='label-float'>
          <input 
            type='text' 
            id='usuario' 
            placeholder='' 
            required 
            value={username} 
            onChange={handleUsernameChange} 
          />
          <label htmlFor='usuario'>Usuário</label>
        </div>

        <div className='label-float'>
          <input 
            type={passwordShown ? 'text' : 'password'} 
            id='senha' 
            placeholder='' 
            required 
            value={password} 
            onChange={handlePasswordChange} 
          />
          <label htmlFor='senha'>Senha</label>
          <i 
            className="fa fa-eye" 
            aria-hidden="true" 
            onClick={togglePasswordVisiblity}
          ></i>
        </div>
        <div className='justify-center'>
          <button onClick={entrar}>Entrar</button>
        </div>
        <div className='justify-center'>
          <hr />
        </div>
        <p>Não tem uma conta?
          <Link to="/signup">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
