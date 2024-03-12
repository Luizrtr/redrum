"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";
import { useTheme } from "next-themes";
import { RxDashboard } from "react-icons/rx";
import { FiTable } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSettings } from "react-icons/md";
import { usePathname } from "next/navigation";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { H2 } from "@/components/Text/h2";
import Link from "next/link";
import { Button } from "../ui/button";

interface Iprops {
  title: string;
  children: ReactNode;
}

const Template: NextPage<Iprops> = ({ children, title }) => {
  const { theme, setTheme } = useTheme();
  const [check, setCheck] = useState(false);
  const [path, setPath] = useState("");
  const pathname = usePathname();

  console.log();

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      setCheck(true);
    } else {
      setTheme("light");
      setCheck(false);
    }
  };

  useEffect(() => {
    setPath(pathname.replace("/", ""));
  }, []);

  return (
    <main className="flex">
      <div className="w-2/5 md:w-1/5 h-screen px-4 py-6 hidden md:flex">
        <div className="bg-gray-200 dark:bg-dark rounded-lg h-full w-full px-2 py-6">
          <div className="text-center pb-8">
            <H2>LOGO</H2>
          </div>
          <Separator />
          <div className="py-8 flex flex-col gap-2">
            <Link
              href="#"
              className="flex gap-4 p-4 rounded-lg bg-purple/50 dark:bg-indigo"
            >
              <RxDashboard size={24} />
              <Label className="text-md">Dashboard</Label>
            </Link>
            <Link
              href="#"
              className="flex gap-4 p-4 rounded-lg active:dark:bg-indigo/50 active:bg-purple/50"
            >
              <FiTable size={24} />
              <Label className="text-md">Table</Label>
            </Link>
            <Link
              href="#"
              className="flex gap-4 p-4 rounded-lg active:dark:bg-indigo/50 active:bg-purple/50"
            >
              <MdOutlineSettings size={24} />
              <Label className="text-md">Settings</Label>
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full">
        <div className="flex justify-between py-4 items-center px-4 md:px-24">
          <div className="hidden md:flex flex-col gap-3">
            <div>
              <Label className="text-gray-600">Pages </Label>
              <Label className="capitalize">/ {path} </Label>
            </div>
            <H2 className="capitalize">{title}</H2>
          </div>
          <div className="flex md:hidden flex-col gap-3">
            <Drawer>
              <DrawerTrigger>
                <GiHamburgerMenu size={26} />
              </DrawerTrigger>
              <DrawerContent className="h-full">
                <DrawerHeader className="pb-12">
                  <DrawerTitle>LOGO</DrawerTitle>
                </DrawerHeader>
                <Separator />
                <div className="py-8 flex flex-col gap-2 px-1">
                  <Link
                    href="#"
                    className="flex gap-4 p-4 rounded-lg bg-purple/50 dark:bg-indigo"
                  >
                    <RxDashboard size={26} />
                    <Label className="text-md">Dashboard</Label>
                  </Link>
                  <Link
                    href="#"
                    className="flex gap-4 p-4 rounded-lg active:dark:bg-indigo/50 active:bg-purple/50"
                  >
                    <FiTable size={26} />
                    <Label className="text-md">Table</Label>
                  </Link>
                  <Link
                    href="#"
                    className="flex gap-4 p-4 rounded-lg active:dark:bg-indigo/50 active:bg-purple/50"
                  >
                    <MdOutlineSettings size={26} />
                    <Label className="text-md">Settings</Label>
                  </Link>
                </div>
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
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
        <div className="mt-4 px-24">{children}</div>
      </div>
    </main>
  );
};

export default Template;
