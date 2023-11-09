import { useState, useEffect } from "react";
import { axiosInstance } from "../api/Request";
import "../styles/FairPage.css";
interface Feira {
  id: number;
  nome: string;
  local: string;
  data: string;
  description: string;
}

const FeiraConnectPage: React.FC = () => {
  const [feiras, setFeiras] = useState<Feira[]>([]);
  const [filtroNome, setFiltroNome] = useState("");

  useEffect(() => {
    const fetchFeiras = async () => {
      try {
        const response = await axiosInstance.get(`/feiras/all`);
        setFeiras(response.data);
        console.log("RESULT FAIR", response.data);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar feiras", error);
      }
    };

    fetchFeiras();
  }, []);

  const filtrarFeirasPorNome = async () => {
    try {
      if (!filtroNome) {
        const response = await axiosInstance.get("/feiras/all");
        setFeiras(response.data);
      } else {
        const response = await axiosInstance.get(`/feiras/nome/${filtroNome}`);
        setFeiras(response.data);
      }
    } catch (error) {
      console.error("Erro ao filtrar feiras", error);
    }
  };

  return (
    <div className="container">
      <div className="filtro-card">
        <input
          type="text"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          placeholder="Digite o nome da feira"
        />
        <button onClick={filtrarFeirasPorNome}>Filtrar</button>
      </div>
      <div className="feiras-container">
        {feiras.map((feira) => (
          <div key={feira.id} className="feira-card">
            <h3>{feira.nome}</h3>
            <p>Local: {feira.local}</p>
            <p>Data: {new Date(feira.data).toLocaleDateString()}</p>
            <p>Descrição: {feira.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeiraConnectPage;
