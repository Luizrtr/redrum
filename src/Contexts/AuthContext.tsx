"use client";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";

import { api } from "@/services/api";
import { recoverUserInformation } from "@/lib/auth";

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
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const cookies = parseCookies();
  const token = cookies["token_redrum"];
  const router = useRouter();
  const [user, setUser] = useState<User | null>(
    token ? jwtDecode(token) : null
  );
  const isAuthenticated = !!user;

  useEffect(() => {
    if (token) {
      recoverUserInformation(token).then((response) => {
        setUser(response);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signIn({ email, password }: SignInData) {
    await api.post("api/login", { email, password }).then((response) => {
      const { data } = response;
      setCookie(undefined, "token_redrum", data.token, {
        maxAge: 60 * 60 * 1, // 1 h
      });
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      setUser({ name: data.name, email: data.email, avatar: data.avatar });
      router.push("/home");
      return response;
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["token_redrum"]: token } = parseCookies(ctx);

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