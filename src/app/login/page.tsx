/* eslint-disable @next/next/no-img-element */
"use client";
import { useTheme } from "next-themes";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/Contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Span } from "@/components/Text/span";
import { H3 } from "@/components/Text/h3";

interface IData {
  email: string;
  password: string;
}

export default function Login() {
  const { theme, setTheme } = useTheme();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<IData>();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: IData) {
    setLoading(true);
    // await signIn(data);
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      setCheck(true);
    } else {
      setTheme("light");
      setCheck(false);
    }
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
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="login">Log-In</TabsTrigger>
              <TabsTrigger value="create">Sign-In</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <div className="flex flex-col p-6 space-y-1">
                  <H3>Log-In</H3>
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
                        {...register("email")}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Password</Label>
                      <Input {...register("password")} />
                    </div>
                  </div>
                  <div className="flex items-center p-6 pt-0">
                    <Button>Submit</Button>
                  </div>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="create">
              <Card>
                <div className="flex flex-col p-6 space-y-1">
                  <H3>Sign-In</H3>
                  <Span>
                    Enter your email and password below to create your account
                  </Span>
                </div>
                <div className="p-6 pt-0 space-y-2">
                  <div className="space-y-1">
                    <Label>E-mail</Label>
                    <Input placeholder="m@exemple.com" />
                  </div>
                  <div className="space-y-1">
                    <Label>New password</Label>
                    <Input />
                  </div>
                </div>
                <div className="flex items-center p-6 pt-0">
                  <Button>Submit</Button>
                </div>
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
      <Switch
        checked={check}
        onCheckedChange={changeTheme}
        className="absolute"
      />
    </section>
  );
}
