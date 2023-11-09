import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  nome: string;
  email: string;
  password: string;
  phone: string;
}

export default function IndexPage() {
  const [userLogado, setUserLogado] = useState<User | null>(null);
  const navigate = useNavigate(); // para react-router-dom v6.x

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      alert("Você precisa estar logado para acessar essa página");
      navigate('/signin'); // Navega para a página de login se não houver token.
    } else {
      const user = localStorage.getItem('userLogado');
      if (user) {
        setUserLogado(JSON.parse(user));
      }
    }
  }, [navigate]);

  const sair = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    navigate('/signin');
  };

  if (!userLogado) {
    return null; // Ou substitua por um componente de spinner/loader se desejar.
  }

  return (
    <div>
      <p id="logado">Olá {userLogado.nome}</p>
      <button onClick={sair}>Sair</button>
    </div>
  );
}
