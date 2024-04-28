"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Contexts/AuthContext";

const RequireAuthentication = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);

    // useEffect(() => {
    //   console.log(isAuthenticated);
    //   if (!isAuthenticated) {
    //     router.push("/login");
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default RequireAuthentication;
