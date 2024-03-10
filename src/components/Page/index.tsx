"use client";
import * as React from "react";
import { NextPage } from "next";
import { useTheme } from "next-themes";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { H2 } from "../Text/h2";

const Page: NextPage = () => {
  const { theme, setTheme } = useTheme();
  const [check, setCheck] = React.useState(false);

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
    <div className="">
      <div className="container mx-auto flex justify-between py-4 items-center">
        <div className="flex flex-col gap-3">
          <div>
            <Label className="text-gray-600">Pages </Label>
            <Label>/ Dashboard </Label>
          </div>
          <H2 className="font-bold">Dashboard</H2>
        </div>
        <div>LOGO</div>
        <div className="flex gap-4 h-14 justify-center items-center">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="p-0">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Profile <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>Settings</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Log out</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Separator orientation="vertical" />
          <Switch checked={check} onCheckedChange={changeTheme} />
        </div>
      </div>
    </div>
  );
};

export default Page;
