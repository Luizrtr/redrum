"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { NextPage } from "next";

interface IProps {
  label: string;
}

const Switch: NextPage<IProps> = ({ label }) => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return <button onClick={changeTheme}> {label}</button>;
};

export default Switch;
