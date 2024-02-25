"use client";
import * as React from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <main className="h-screen w-screen">
      <div className="mx-auto text-center">
        <button onClick={changeTheme}> light</button>
      </div>
    </main>
  );
}
