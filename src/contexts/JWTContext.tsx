import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import type { User } from "../models/User";
import { authApiEx } from "../api/AuthApi";

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}
export interface AuthContextValue extends State {
  platform: "JWT";
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phoneNumber: string
  ) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: "INITIALIZE";
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: "LOGIN";
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type RegisterAction = {
  type: "REGISTER";
  payload: {
    user: User;
  };
};

type Action = InitializeAction | LoginAction | LogoutAction | RegisterAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: State, action: RegisterAction): State => {
    console.log("91", "action", action);

    return {
      ...state,
      isAuthenticated: false,
      // user
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          const user = await authApiEx.me();
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error("Initialization error:", err);
        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: false, user: null },
        });
        sessionStorage.removeItem("token");
        delete axios.defaults.headers.common.Authorization;
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const accessToken = await authApiEx.doAuthSupervisory(email, password);
      if (typeof accessToken === "string") {
        sessionStorage.setItem("token", accessToken);
        const user = await authApiEx.me();
        dispatch({
          type: "LOGIN",
          payload: { user },
        });
        navigate("/index");
      } else {
        console.error("Received accessToken is not a string:", accessToken);
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  const register = async (userData: User): Promise<void> => {
    try {
      const response = await authApiEx.register(userData);
      if (typeof response === "string") {
        sessionStorage.setItem("token", response); // Supõe-se que a resposta tenha a informação do usuário
        const newUser = await authApiEx.me();
        dispatch({
          type: "REGISTER",
          payload: { user: newUser },
        });
        navigate("/index");
      } else {
        console.error("Received accessToken is not a string:", response);
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, platform: "JWT", login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
