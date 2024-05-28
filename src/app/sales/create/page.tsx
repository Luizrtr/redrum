"use client"
import { useContext } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MdArrowBackIos } from "react-icons/md";

import { AuthContext } from "@/Contexts/AuthContext"
import Template from "@/components/Template"
import { Card } from "@/components/ui/card"
import { H3 } from "@/components/Text/h3"
import { Span } from "@/components/Text/span"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { H1 } from "@/components/Text/h1";

const FormSchema = z.object({
  nameCliente: z
    .string({
      required_error: "Please select an email to display.",
    }),
  emailCliente: z
    .string({
      required_error: "Please select an email to display.",
    }),
  descriptionCliente: z
    .string({
      required_error: "Please select an email to display.",
    }),
})

function Page() {
  const { token } = useContext(AuthContext)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(sale: z.infer<typeof FormSchema>) {
    console.log(sale)
  }

  return (
    <Template slug="sales" title="Sales">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <main className="mx-auto w-3/4">
            <div className="flex justify-between gap-4 pb-4">
              <div className="flex flex-row gap-4 items-center">
                <Button className="border dark:border-gray-50 dark:bg-black-50 dark:text-white bg-white text-black border-white-50 h-7 w-7 p-0 justify-center items-center dark:hover:bg-gray-50/50 hover:bg-white-50">
                  <MdArrowBackIos />
                </Button>
                <H3>Registration form</H3>
              </div>
              <div className="flex flex-row gap-4">
                <Button variant="secondary" size="sm">
                  Discard
                </Button>
                <Button size="sm">
                  Save
                </Button>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-3/5">
                <Card>
                  <div className="flex flex-col p-6 space-y-1">
                    <H3>Client Details</H3>
                    <Span>
                      Enter your email and password below to access your account
                    </Span>
                  </div>
                  <div className="p-6 pt-0 grid gap-4">
                    <FormField
                      control={form.control}
                      name="nameCliente"
                      render={({ field }) => (
                        <FormItem className="grid">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emailCliente"
                      render={({ field }) => (
                        <FormItem className="grid">
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="descriptionCliente"
                      render={({ field }) => (
                        <FormItem className="grid">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              </div>
              <div className="h-1/3">
                <Card>
                  <div className="flex flex-col p-6 space-y-1">
                    <H3>Sales Details</H3>
                    <Span>
                      Enter your email and password below to access your account
                    </Span>
                  </div>
                </Card>
              </div>
            </div>

          </main>
        </form>
      </Form>
    </Template>
  )
}

export default Page
