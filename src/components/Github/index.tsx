import { NextPage } from "next";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";


const Github: NextPage = () => {
  return (
    <Button variant="secondary">
      <FaGithub />
      Github
    </Button>
  )
}

export default Github