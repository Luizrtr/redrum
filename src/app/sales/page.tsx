"use client";
import { useContext } from "react";

import { AuthContext } from "@/Contexts/AuthContext";
import Template from "@/components/Template";


function Page() {
  const { token, limitCharacters } = useContext(AuthContext);
  return (
    <Template slug="sales" title="Sales">
      Sales
    </Template>
  );
}

export default Page;
