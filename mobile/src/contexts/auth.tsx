import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import API from '../types/api';

//import * as auth from "../services/auth";

interface AuthContextData {
  signed: boolean;
  user: { id: string; name: string; email: string, isAdmin: boolean } | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ id: String; name: string; email: string } | null>(null);

  useEffect(() => {
    // Recuperar token e informações do usuário ao carregar o app
    const loadStoredData = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      const storedUser = await SecureStore.getItemAsync("authUser");

      if (token && storedUser) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(JSON.parse(storedUser));
      }
    };

    loadStoredData();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      // Realizar login na API
      const response = await axios.post(API.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      //console.log(user);

      // Armazenar token e dados do usuário
      await SecureStore.setItemAsync("authToken", token);
      await SecureStore.setItemAsync("authUser", JSON.stringify(user));

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      console.error("Erro no login:", error);
      throw new Error("Falha no login. Verifique suas credenciais.");
    }
  }

  async function signOut() {
    // Remover token e dados do SecureStore e limpar o estado do usuário
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("authUser");

    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;