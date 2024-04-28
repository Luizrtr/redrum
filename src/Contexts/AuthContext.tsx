"use client";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";

import { api } from "@/services/api";
import { recoverUserInformation } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type User = {
  name: string;
  email: string;
  avatar: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<any>;
  logout: () => void;
  token: string | null;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const cookies = parseCookies();
  const token = cookies["token_redrum"];
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(() => {
    if (token) {
      recoverUserInformation(token)
        .then(userFromToken => setUser(userFromToken)) 
        .catch(error => console.error('Error retrieving user information:', error));
    }
    return null;
  });  
  const isAuthenticated = !!user;

  useEffect(() => {
    async function fetchUser() {
      const userFromToken = await recoverUserInformation(token);
      setUser(userFromToken);
    }

    fetchUser();
  }, [token]);

  async function signIn({ email, password }: SignInData) {
    await api.post("api/login", { email, password }).then(async (response) => {
      const { data } = response;
      setCookie(undefined, "token_redrum", data.token, {
        maxAge: 60 * 60 * 1, // 1 h
      });
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      setUser({ name: data.name, email: data.email, avatar: data.avatar });
      await router.push("/dashboard");
      toast({
        title: "Logged in user.",
        description: "You have successfully logged in!",
      });
      return response;
    });
  }

  async function logout() {
    await destroyCookie(null, "token_redrum");
    setUser(null);
    router.push("/login");
    toast({
      title: "Logout account",
      description: "You have successfully logged out!",
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["token_redrum"]: token } = parseCookies(ctx);
console.log("token: ", token);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};