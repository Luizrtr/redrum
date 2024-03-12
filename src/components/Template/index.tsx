"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";
import { useTheme } from "next-themes";
import { RxDashboard } from "react-icons/rx";
import { FiTable } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSettings } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
import { Button } from "../ui/button";
import { Span } from "../Text/span";

interface Iprops {
  title: string;
  children: ReactNode;
  slug: string;
}

const Template: NextPage<Iprops> = ({ children, title, slug }) => {
  const { theme, setTheme } = useTheme();
  const [check, setCheck] = useState(false);
  const [path, setPath] = useState("");
  const pathname = usePathname();

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
      <div className="w-2/5 lg:w-1/5 h-screen px-4 py-6 hidden lg:flex">
        <div className="rounded-xl border dark:border-gray-50 border-white-50 text-card-foreground shadow h-full w-full px-2 py-6">
          <div className="text-center pb-8">
            <H2>LOGO</H2>
          </div>
          <Separator />
          <div className="py-8 flex flex-col gap-2">
            <Link
              href="/home"
              className={
                slug === "dashboard"
                  ? "flex gap-4 p-4 rounded-lg bg-black-50/50 dark:bg-white-50/50"
                  : "flex gap-4 p-4 rounded-lg active:dark:bg-white-50/50 active:bg-black-50/50"
              }
            >
              <RxDashboard size={24} />
              <Label className="text-md">Dashboard</Label>
            </Link>
            <Link
              href="/table"
              className={
                slug === "table"
                  ? "flex gap-4 p-4 rounded-lg bg-black-50/50 dark:bg-white-50/50"
                  : "flex gap-4 p-4 rounded-lg active:dark:bg-white-50/50 active:bg-black-50/50"
              }
            >
              <FiTable size={24} />
              <Label className="text-md">Table</Label>
            </Link>
            <Link
              href="/settings"
              className={
                slug === "settings"
                  ? "flex gap-4 p-4 rounded-lg bg-black-50/50 dark:bg-white-50/50"
                  : "flex gap-4 p-4 rounded-lg active:dark:bg-white-50/50 active:bg-black-50/50"
              }
            >
              <MdOutlineSettings size={24} />
              <Label className="text-md">Settings</Label>
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full">
        <div className="flex justify-between py-4 items-center px-4 lg:px-24">
          <div className="hidden lg:flex flex-col gap-3">
            <div>
              <Span>Pages </Span>
              <Label className="capitalize">/ {path} </Label>
            </div>
            <H2 className="capitalize">{title}</H2>
          </div>
          <div className="flex lg:hidden flex-col gap-3">
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
                    href="/home"
                    className={
                      slug === "dashboard"
                        ? "flex gap-4 p-4 rounded-lg bg-black-50/50 dark:bg-white-50/50"
                        : "flex gap-4 p-4 rounded-lg active:dark:bg-white-50/50 active:bg-black-50/50"
                    }
                  >
                    <RxDashboard size={26} />
                    <Label className="text-md">Dashboard</Label>
                  </Link>
                  <Link
                    href="/table"
                    className={
                      slug === "table"
                        ? "flex gap-4 p-4 rounded-lg bg-black-50/50 dark:bg-white-50/50"
                        : "flex gap-4 p-4 rounded-lg active:dark:bg-white-50/50 active:bg-black-50/50"
                    }
                  >
                    <FiTable size={26} />
                    <Label className="text-md">Table</Label>
                  </Link>
                  <Link
                    href="/settings"
                    className={
                      slug === "settings"
                        ? "flex gap-4 p-4 rounded-lg bg-black-50/50 dark:bg-white-50/50"
                        : "flex gap-4 p-4 rounded-lg active:dark:bg-white-50/50 active:bg-black-50/50"
                    }
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
        <div className="mt-4 px-4 lg:px-24">{children}</div>
      </div>
    </main>
  );
};

export default Template;
