/* eslint-disable @next/next/no-img-element */
"use client"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { LuAlertTriangle } from "react-icons/lu"
import { LiaUser } from "react-icons/lia"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeProvider } from "@/Contexts/Theme"
import { Card } from "@/components/ui/card"
import { Span } from "@/components/Text/span"
import { H3 } from "@/components/Text/h3"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { login, register as registerUser } from "@/server/actions/user.actions"

interface IData {
  email?: string
  password?: string
  nameSignUp?: string
  emailSignUp?: string
  passwordSignUp?: string
}

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [alertError, setAlertError] = useState(false)
  const [alertSucess, setAlertSucess] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string>("")
  const [tabs, setTabs] = useState<string>("signin")
  const [requiredSignIn, setRequiredSignIn] = useState(true)
  const [requiredSignUp, setRequiredSignUp] = useState(false)
  const { register, handleSubmit, setError, reset } = useForm<IData>()
  const router = useRouter()
  const { toast } = useToast()
  const [imageSeed, setImageSeed] = useState(Date.now())


  async function handleSignIn(data: IData) {
    setLoading(true)

    const response = await login({
      email: data.email ?? "",
      password: data.password ?? ""
    })

    if (response.success) {
      router.push("/")
    } else {
      setAlertError(true)
      setAlertMessage(response.message ?? "")
    }

    setLoading(false)
  }

  async function handleSignUp(data: IData) {
    setLoading(true)

    if (alertError) {
      setAlertError(false)
    }

    if (alertSucess) {
      setAlertSucess(false)
    }

    if (!data.emailSignUp || !data.nameSignUp || !data.passwordSignUp) {
      return
    }

    const response = await registerUser({
      name: data.nameSignUp ?? "",
      email: data.emailSignUp ?? "",
      password: data.passwordSignUp ?? ""
    })

    if (response.sucess) {
      setAlertSucess(true)
    } else {
      setAlertError(true)
    }

    setAlertMessage(response.message)
    setTabs("signup")
    reset()
    setLoading(false)
  }

  const refreshImage = () => {
    setImageSeed(Date.now())
  }

  useEffect(() => {
    setError("email", {
      types: {
        required: "This is required",
        minLength: "This is minLength",
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const configForm = (value: string) => {
    if (value === "active") {
      setRequiredSignIn(true)
      setRequiredSignUp(false)
    } else if (value === "inactive") {
      setRequiredSignIn(false)
      setRequiredSignUp(true)
    }

    return false
  }

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src={`https://picsum.photos/1920/1080?random=${imageSeed}`}
          alt="img "
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white dark:bg-black w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        {!loading ? (
          <Tabs defaultValue={tabs} className="w-[400px]">
            <TabsList>
              <TabsTrigger
                value="signin"
              // ref={(e) => configForm(e?.dataset.state ?? "")}
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
                        type="email"
                        placeholder="m@exemple.com"
                        {...register("email", { required: requiredSignIn })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        {...register("password", {
                          required: requiredSignIn,
                          minLength: 8,
                        })}
                      />
                    </div>
                    {tabs === "signin" && alertError && (
                      <div className="pt-4">
                        <Alert variant="error">
                          <LuAlertTriangle size={18} />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{alertMessage}</AlertDescription>
                        </Alert>
                      </div>
                    )}
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
                      <Label>Name</Label>
                      <Input
                        placeholder="Redrum"
                        type="name"
                        {...register("nameSignUp", {
                          required: requiredSignUp,
                          minLength: 5,
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>E-mail</Label>
                      <Input
                        placeholder="m@exemple.com"
                        type="email"
                        {...register("emailSignUp", {
                          required: requiredSignUp,
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>New password</Label>
                      <Input
                        type="password"
                        {...register("passwordSignUp", {
                          required: requiredSignUp,
                          minLength: 8,
                        })}
                      />
                    </div>
                    {alertError && (
                      <div className="pt-4">
                        <Alert variant="error">
                          <LuAlertTriangle size={18} />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{alertMessage}</AlertDescription>
                        </Alert>
                      </div>
                    )}
                    {alertSucess && (
                      <div className="pt-4">
                        <Alert variant="sucess">
                          <LiaUser size={20} />
                          <AlertTitle>Sucess</AlertTitle>
                          <AlertDescription>{alertMessage}</AlertDescription>
                        </Alert>
                      </div>
                    )}
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
