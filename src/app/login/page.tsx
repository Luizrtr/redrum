/* eslint-disable @next/next/no-img-element */
"use client";
import { useTheme } from "next-themes";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/Contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Span } from "@/components/Text/span";
import { H3 } from "@/components/Text/h3";

interface IData {
  email?: string;
  password?: string;
  emailSignUp?: string;
  passwordSignUp?: string;
}

export default function Login() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [requiredSignIn, setRequiredSignIn] = useState(true);
  const [requiredSignUp, setRequiredSignUp] = useState(false);
  const { register, handleSubmit, setError } = useForm<IData>();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: {email: string, password: string}) {

    setLoading(true);
    await signIn({ email: data.email, password: data.password});
    setLoading(false);
  }

  async function handleSignUp(data: IData) {
    console.log("handleSignUp");
  }

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    console.log(requiredSignIn);
    setError("email", {
      types: {
        required: "This is required",
        minLength: "This is minLength",
      },
    });
  }, []);

  const configForm = (value: string) => {
    if (value === "active") {
      setRequiredSignIn(true);
      setRequiredSignUp(false);
    } else if (value === "inactive") {
      setRequiredSignIn(false);
      setRequiredSignUp(true);
    }

    return false;
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt="img "
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white dark:bg-black w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        {!loading ? (
          <Tabs defaultValue="signin" className="w-[400px]">
            <TabsList>
              <TabsTrigger
                value="signin"
                ref={(e) => configForm(e?.dataset.state ?? "")}
              >
                Sign-In
              </TabsTrigger>
              <TabsTrigger value="signup">Sign-Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <Card>
                <div className="flex flex-col p-6 space-y-1">
                  <H3>Sign-In</H3>
                  <Span>
                    Enter your email and password below to access your account
                  </Span>
                </div>
                <form onSubmit={handleSubmit(handleSignIn)}>
                  <div className="p-6 pt-0 space-y-2">
                    <div className="space-y-1">
                      <Label>E-mail</Label>
                      <Input
                        placeholder="m@exemple.com"
                        {...register("email", { required: requiredSignIn })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Password</Label>
                      <Input
                        {...register("password", { required: requiredSignIn })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center p-6 pt-0">
                    <Button>Submit</Button>
                  </div>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card>
                <div className="flex flex-col p-6 space-y-1">
                  <H3>Sign-Up</H3>
                  <Span>
                    Enter your email and password below to create your account
                  </Span>
                </div>
                <form action="" onSubmit={handleSubmit(handleSignUp)}>
                  <div className="p-6 pt-0 space-y-2">
                    <div className="space-y-1">
                      <Label>E-mail</Label>
                      <Input
                        placeholder="m@exemple.com"
                        {...register("emailSignUp", {
                          required: requiredSignUp,
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>New password</Label>
                      <Input
                        {...register("passwordSignUp", {
                          required: requiredSignUp,
                        })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center p-6 pt-0">
                    <Button>Submit</Button>
                  </div>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col space-y-3 h-64 w-96">
            <Skeleton className="h-5/6 w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
