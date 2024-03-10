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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "../ui/separator";

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
    <div className="border-b dark:border-gray-700 border-gray-400">
      <div className="container mx-auto flex justify-between py-4 items-center">
        <Sheet key="left">
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
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
