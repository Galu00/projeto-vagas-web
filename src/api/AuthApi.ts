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

      const tokenPart = response.data.token.startsWith("Bearer ")
        ? response.data.token.slice("Bearer ".length)
        : response.data.token;

      return tokenPart; // You should return the token part where 'Bearer ' is removed
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  }

  async me(tokenObject: { id: number; token: string }): Promise<User> {
    console.log("UserID for me():", tokenObject.id);
    try {
      // Use the ID from the token object to construct the URL
      const { data } = await axiosInstance.get(`/usuarios/${1}`);
      return data.user;
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
