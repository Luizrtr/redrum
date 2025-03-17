import { NextPage } from "next";

import { Card } from "@/components/ui/card";
import { H3 } from "@/components/Text/h3";
import { Span } from "@/components/Text/span";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Github from "@/components/Github"
import Twitter from "@/components/Twitter"

const SignUp: NextPage = () => {
  return (
    <Card>
      <div className="flex flex-col p-6 space-y-1">
        <H3>Sign-Up</H3>
        <Span>
          Enter your email and password below to create your account
        </Span>
      </div>
      <form>
        <div className="p-6 pt-0 space-y-2">
          <div className="grid grid-cols-2 gap-6">
            <Github />
            <Twitter />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-black-50 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              placeholder="Redrum"
              type="name"
            />
          </div>
          <div className="space-y-1">
            <Label>E-mail</Label>
            <Input
              placeholder="m@exemple.com"
              type="email"
            />
          </div>
          <div className="space-y-1">
            <Label>New password</Label>
            <Input
              type="password"
            />
          </div>
          {/* {alertError && (
            <div className="pt-4">
              <Alert variant="error">
                <LuAlertTriangle size={18} />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            </div>
          )} */}
          {/* {alertSucess && (
            <div className="pt-4">
              <Alert variant="sucess">
                <LiaUser size={20} />
                <AlertTitle>Sucess</AlertTitle>
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

export default SignUp