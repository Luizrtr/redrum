import { NextPage } from "next";
import { FaXTwitter } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

const Github: NextPage = () => {
  return (
    <Button variant="secondary">
      <FaXTwitter />
      Twitter
    </Button>
  )
}

export default Github