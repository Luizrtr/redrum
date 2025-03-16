"use client"

import { useContext, useEffect, useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Theme } from "@/Contexts/Theme"
import SignIn from "@/components/SignIn"
import SignUp from "@/components/SignUp"

export default function Login() {
  const [loading] = useState(false)
  const [imageSeed] = useState(Date.now())
  const { tabs } = useContext(Theme)

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 
      xl:w-2/3 h-screen"
      >
        <img
          src={`https://picsum.photos/1920/1080?random=${imageSeed}`}
          alt="img "
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white dark:bg-black w-full md:max-w-md 
        lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        {!loading ? (
          <Tabs defaultValue={tabs} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="signin">Sign-In</TabsTrigger>
              <TabsTrigger value="signup">Sign-Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignIn />
            </TabsContent>
            <TabsContent value="signup">
              <SignUp />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col space-y-3 h-64 w-96">
            <Skeleton className="h-5/6 w-full rounded-xl select-none" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full select-none" />
              <Skeleton className="h-4 w-5/6 select-none" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
