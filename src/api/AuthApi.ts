import { User } from "../models/User";
import { axiosInstance } from "./Request";

class AuthApiEx {
  async doAuthSupervisory(
    emailStr: string,
    passwordStr: string
  ): Promise<string> {
    try {
      const response = await axiosInstance.post("/usuarios/logar", {
        email: emailStr,
        senha: passwordStr,
      });
      console.log("Token Received: ", response.data);

      const token = response.data.token.startsWith("Bearer ")
        ? response.data.token.slice("Bearer ".length)
        : response.data.token;

      // Armazenar o token no Local Storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", response.data.id.toString());

      return token;
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  }

  async me(): Promise<User> {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");

      const { data } = await axiosInstance.get(`/usuarios/${userId}`);
      console.log("User data retrieved", data);
      localStorage.setItem("userData", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching user data: ", error);
      throw error;
    }
  }

  async register(body: User): Promise<void> {
    try {
      const { data } = await axiosInstance.post("/usuario/cadastrar", body);
      console.log("PostUser: ", data);
      // Sem retorno necessário se apenas logamos o resultado
    } catch (error) {
      console.error("Error during registration: ", error);
      throw error; // Lançar o erro para ser tratado pelo componente chamador
    }
  }

  async getUser(): Promise<User[]> {
    try {
      const { data } = await axiosInstance.get("/usuarios");
      console.log("GetUser: ", data);
      return data.users; // Assumindo que os usuários são retornados diretamente em `data.users`
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw error; // Lançar o erro para ser tratado pelo componente chamador
    }
  }
}

export const authApiEx = new AuthApiEx();
