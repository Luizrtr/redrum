"use client"
import { useContext, useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MdKeyboardArrowLeft  } from "react-icons/md"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { api } from "@/services/api"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type IServices = {
  _id: string
  name: string
  type: {
    _id: string
    createdAt: string
    is_enabled: boolean
    name: string
  }
  description: string
  amount: number
  is_enabled: boolean
  createdAt: string
}

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
  service: z
    .string({
      required_error: "Please select an email to display.",
    }),
})

function Page() {
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<IServices[]>()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const router = useRouter()
  const { toast } = useToast()
  
  const handleResetServices = () => {
    form.setValue('nameCliente', '')
    form.setValue('emailCliente', '')
    form.setValue('descriptionCliente', '')
    form.setValue('service', '')
  }

  async function onSubmit(sale: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      await api.post(
        `api/sales/create`,
        sale,
        {
          headers: {
            Authorization: token
          }
        }
      ).then(response => {
        if (response.status === 200) {   
          handleResetServices()
          router.push('/sales')
          toast({
            title: "Sales",
            description: "You have successfully created the sale!",
          });
        }
      })
      setLoading(false)
    } catch (error) {
      console.error("Error create service: ", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchServies = async () => {
      try {
        const config = {
          headers: {
            Authorization: token
          }
        }
        await axios.get(
          `${process.env.HOST}/api/services/fetchAll`,
          config).then(response => {
            const { data } = response
            const enabledServices = data.filter(
              (data: { is_enabled: any }) => data.is_enabled)
            setServices(enabledServices)
          })
      } catch (error) {
        console.error('Erro ao fazer consulta à API:', error)
      }
    }

    fetchServies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Template slug="sales" title="Sales">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <main className="mx-auto w-3/5  select-none">
            <div className="flex justify-between gap-4 pb-4">
              <div className="flex flex-row gap-4 items-center">
                <Button className="border dark:border-gray-50 dark:bg-black-50 dark:text-white bg-white text-black border-white-50 h-7 w-7 p-0 justify-center items-center dark:hover:bg-gray-50/50 hover:bg-white-50">
                  <MdKeyboardArrowLeft size={24} />
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
              <div className="w-3/5 flex flex-col gap-8">
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
              <div className="w-2/5">
                <Card>
                  <div className="flex flex-col p-6 space-y-1 gap-4">
                    <H3>Service Details</H3>
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Services</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services && (
                                <>
                                  {services.map(e => (
                                    <SelectItem key={e._id} value={e._id}>{e.name}</SelectItem>
                                  ))}
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
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
