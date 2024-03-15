/* eslint-disable @next/next/no-img-element */
"use client";
import { useTheme } from "next-themes";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AuthContext } from "@/Contexts/AuthContext";

interface IData {
  email: string;
  password: string;
}

export default function Login() {
  const { theme, setTheme } = useTheme();
  const [check, setCheck] = useState(false);
  const { register, handleSubmit } = useForm<IData>();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: IData) {
    await signIn(data);
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
        className="bg-gray-100 dark:bg-dark w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-gray-900 dark:text-gray-300">
            Login
          </h1>

          <form
            className="mt-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="flex flex-col gap-4">
              <Label className="block text-gray-900 dark:text-gray-300">
                E-mail
              </Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter E-mail"
              />
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <Label className="block text-gray-900 dark:text-gray-300">
                Password
              </Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <Button
              type="submit"
              className="w-full block bg-indigo hover:bg-indigo-40bg-indigog-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Log In
            </Button>
          </form>

          <hr className="my-6 border-gray-900 dark:border-gray-300 w-full text-gray-900 dark:text-gray-300" />
          <p className="mt-8 text-gray-900 dark:text-gray-300">
            Need an account?{" "}
            <a href="#" className="text-blue font-semibold">
              Create an account
            </a>
          </p>

          <Switch checked={check} onCheckedChange={changeTheme} />
        </div>
      </div>
    </section>
  );
}
