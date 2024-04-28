"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Contexts/AuthContext";

// Use a classe da Shadcn aqui

export default function Page() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <main></main>;
}
