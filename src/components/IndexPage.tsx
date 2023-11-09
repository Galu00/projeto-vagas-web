import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/IndexPage.css";

interface User {
  nome: string;
  email: string;
  password: string;
  phone: string;
}

export default function IndexPage() {
  const [userLogado, setUserLogado] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    console.log("Token atual:", token); // Adicione esta linha para ver o token atual no console
    console.log("Dados do usuário atual:", userData); // E esta para ver os dados do usuário

    // Alerta e redireciona se o token não estiver presente
    if (!token) {
      alert("Você precisa estar logado para acessar essa página");
      navigate("/signin");
    } else if (userData) {
      // Se userData está presente, tente configurar o estado do usuário logado
      try {
        const user: User = JSON.parse(userData);
        setUserLogado(user);
        console.log("Usuário configurado como logado:", user); // Confirme que o usuário foi configurado corretamente
      } catch (e) {
        console.error("Erro ao analisar os dados do usuário logado:", e);
      }
    }
  }, [navigate]);

  const sair = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/signin");
  };

  if (!userLogado) {
    return null;
  }

  return (
    <div>
      <p id="logado">Olá {userLogado.nome}</p>
      <button onClick={sair}>Sair</button>
    </div>
  );
}
