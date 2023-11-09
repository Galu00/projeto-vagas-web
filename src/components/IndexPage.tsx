import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/IndexPage.css";
import FairPage from "./FairPage";

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

    console.log("Token atual:", token);
    console.log("Dados do usuário atual:", userData);

    if (!token) {
      alert("Você precisa estar logado para acessar essa página");
      navigate("/signin");
    } else if (userData) {
      try {
        const user: User = JSON.parse(userData);
        setUserLogado(user);
        console.log("Usuário configurado como logado:", user);
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
      <h1 id="Usuário logado">Olá {userLogado.nome}</h1>
      <FairPage />
      <button onClick={sair}>Sair</button>
    </div>
  );
}
