import axios from 'axios';
import { User } from '../models/User';

class AuthApiEx {
  async doAuthSupervisory(emailStr: string, passwordStr: string): Promise<string> {
    const { data } = await axios.post('Auth', {
      email: emailStr,
      password: passwordStr,
    });

    const token = data.data.token.toString();

    return token;
  }

  async me(): Promise<User> {
    const { data } = await axios.get('Auth/user');

    const user = { ...data.data.user };

    return user;
  }

  async register(body: User): Promise<string> {
    return axios.post('usuario/cadastrar', body).then((res) => {
      console.log('=================================================================PostUser: ', res.data);
      return res.data;
    });
  }

  async getUser(): Promise<User> {
    return axios.get('Auth/user').then((res) => {
      console.log('GetUser: ', res.data);
      return res.data.data.users;
    });
  }
}

export const authApiEx = new AuthApiEx();