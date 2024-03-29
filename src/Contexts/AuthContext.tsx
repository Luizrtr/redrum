"use client";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";

import { useRouter } from "next/navigation";
import { api, getAPIClient } from "@/services/api";
import { GetServerSideProps } from "next";

type User = {
  name: string;
  email: string;
  avatar: string;
  token: string;
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
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const cookies = parseCookies();
  const router = useRouter();

  async function signIn({ email, password }: SignInData) {
    await api.post("api/login", { email, password }).then((response) => {
      const { data } = response;
      setCookie(undefined, "token_redrum", data.token, {
        maxAge: 60 * 60 * 1, // 1 h
      });
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      setUser({
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        token: data.token,
      });

      router.push("/home");
      return response;
    });
  }

  // useEffect(() => {
  //   const token = cookies["token_redrum"];
  //   if (token) {
  //     recoverUserInformation().then((response) => {
  //       setUser(response.user);
  //     });
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["token_redrum.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
