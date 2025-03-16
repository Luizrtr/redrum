import { NextPage } from "next"
import { LuAlertTriangle } from "react-icons/lu"
import { useContext } from "react";

import { Card } from "@/components/ui/card"
import { H3 } from "@/components/Text/h3"
import { Span } from "@/components/Text/span"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Theme } from "@/Contexts/Theme"

const SignIn: NextPage = () => {
  const { tabs } = useContext(Theme)

  return (
    <Card>
      <div className="flex flex-col p-6 space-y-1">
        <H3>Sign-In</H3>
        <Span>
          Enter your email and password below to access your account
        </Span>
      </div>
      <form>
        <div className="p-6 pt-0 space-y-2">
          <div className="space-y-1">
            <Label>E-mail</Label>
            <Input
              type="email"
              placeholder="m@exemple.com"
            />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
            />
          </div>
          {/* {tabs === "signin" && alertError && (
            <div className="pt-4">
              <Alert variant="error">
                <LuAlertTriangle size={18} />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            </div>
          )} */}
        </div>
        <div className="flex items-center p-6 pt-0">
          <Button>Submit</Button>
        </div>
      </form>
    </Card>
  )
}

export default SignIn