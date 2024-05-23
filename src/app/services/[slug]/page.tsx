"use client"
import { useContext, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import axios from "axios"

import Template from "@/components/Template"
import { H3 } from "@/components/Text/h3"
import { Span } from "@/components/Text/span"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthContext } from "@/Contexts/AuthContext"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { api } from "@/services/api"


type ITypes = {
  _id: string
  name: string
  is_enabled: boolean
}

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please select an email to display.",
    }),
  type: z
    .string({
      required_error: "Please select an name to display.",
    }),
  amount: z
    .string({
      required_error: "Please select an name to display.",
    }),
  description: z
    .string({
      required_error: "Please select an name to display.",
    }),
})


function Page({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(false)
  const { token } = useContext(AuthContext)
  const [typesServices, setTypesServices] = useState<ITypes[]>()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(service: z.infer<typeof FormSchema>) {
    console.log(service)
  }
  
  useEffect(() => {
    const fetchTypesServies = async () => {
      try {
       await axios.get(`${process.env.HOST}/api/typeServices/fetchAll`, { 
        headers: {
          Authorization: token
        }
       }).then(response => {
        if (response) {
          const { data } = response
          setTypesServices(data)
        }
       })
      } catch (error) {
        console.error('Erro ao fazer consulta à API:', error)
      }
    }

    fetchTypesServies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <Template slug="services" title="Services">
      <Card className="w-1/2 mx-auto">
        <div className="flex flex-col p-6 space-y-1">
          <H3>Edit service</H3>
          <Span>
            Make changes to your service here. click sabe when you're done.
          </Span>
        </div>
        <div className="p-6 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Service</FormLabel>
                      <FormControl className="col-span-3">
                        <Input {...field} />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="col-span-3">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typesServices && (
                            <>
                              {typesServices.map(e => (
                                <SelectItem key={e._id} value={e._id}>{e.name}</SelectItem>
                              ))}
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Amount</FormLabel>
                      <FormControl className="col-span-3">
                        <Input type="number" {...field} />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Description</FormLabel>
                      <FormControl className="col-span-3">
                        <Textarea id="description" {...field} />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 justify-end">
                <Button variant="outline">Close</Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>

      </Card>
    </Template>
  )
}
export default Page