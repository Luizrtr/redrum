"use client";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";

import { recoverUserInformation, signInRequest } from "@/services/auth";
import { useRouter } from "next/navigation";
import { api, getAPIClient } from "@/services/api";
import { GetServerSideProps } from "next";

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const cookies = parseCookies();

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "token_redrum", token, {
      maxAge: 60 * 60 * 1, // 1 h
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);
    router.push("/home");
  }

  useEffect(() => {
    const token = cookies["token_redrum"];
    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

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
