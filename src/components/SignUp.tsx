import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Atualize com o caminho correto do seu CSS

export const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [message, setMessage] = useState({ error: '', success: '' });
  const navigate = useNavigate();

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        return value.length > 2;
      case 'username':
        return value.length > 4;
      case 'password':
        return value.length > 5;
      case 'confirmPassword':
        return value === password;
      default:
        return false;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
  };

  const cadastrar = () => {
    if (
      validateField('name', name) &&
      validateField('username', username) &&
      validateField('password', password) &&
      validateField('confirmPassword', confirmPassword)
    ) {
      const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
      listaUser.push({ nomeCad: name, userCad: username, senhaCad: password });
      localStorage.setItem('listaUser', JSON.stringify(listaUser));
      setMessage({ ...message, success: 'Cadastrando usuário...', error: '' });

      setTimeout(() => {
        navigate('/signin'); // Redireciona para a página de login após cadastro
      }, 2000);
    } else {
      setMessage({ ...message, error: 'Preencha todos os campos corretamente antes de cadastrar', success: '' });
    }
  };

  return (
    <div className='container'>
      <div className='card'>
        <h1>Cadastrar</h1>
        {message.error && <div id='msgError' style={{ color: 'red' }}>{message.error}</div>}
        {message.success && <div id='msgSuccess' style={{ display: 'block' }}>{message.success}</div>}
        {/* Os campos de entrada seguirão aqui, com seus respectivos estados e manipuladores */}
        {/* Implemente os campos de entrada e botões como feito anteriormente, usando os estados e as funções de validação. */}
      </div>
    </div>
  );
};
