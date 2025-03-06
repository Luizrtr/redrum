"use client"
import { useContext, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"

import { useToast } from "@/components/ui/use-toast"
import Template from "@/components/Template"
import { H3 } from "@/components/Text/h3"
import { Span } from "@/components/Text/span"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
import { AuthContext } from "@/Contexts/Theme"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { api } from "@/services/api"
import { MdKeyboardArrowLeft } from "react-icons/md"

type ITypes = {
  _id: string
  name: string
  is_enabled: boolean
}

type ISales = {
  _id: string
  createdAt: string
  description_client: string
  email_client: string
  name_client: string
  service: string
  status: {
    createdAt: string
    is_enabled: boolean
    name: string
    id: number
  }
}

type IServices = {
  _id: string
  name: string
  createdAt: string
}

const FormSchema = z.object({
  nameCliente: z.string().optional(),
  emailCliente: z.string().optional(),
  descriptionCliente: z.string().optional(),
  service: z.string().optional()
})

function Page({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [sales, setSales] = useState<ISales>()
  const [services, setServices] = useState<IServices[]>()
  const { token } = useContext(AuthContext)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit(sales: z.infer<typeof FormSchema>) {
    const updatedFields: Partial<ISales> = {}

    if (sales.nameCliente !== sales?.nameCliente) {
      updatedFields.name_client = sales.nameCliente
    }
    if (sales.emailCliente !== sales?.emailCliente) {
      updatedFields.email_client = sales.emailCliente
    }
    if (sales.service !== sales?.service) {
      updatedFields.service = sales.service
    }
    if (sales.descriptionCliente !== sales?.descriptionCliente) {
      updatedFields.description_client = sales.descriptionCliente
    }

    if (Object.keys(updatedFields).length > 0) {
      setLoading(true)
      try {
        // await api.put(`${process.env.HOST}/api/sales/update`, {
        //   id: services?._id,
        //   name: service.name,
        //   amount: service.amount,
        //   type: service.type,
        //   description: service.description,
        //   is_enabled: service.is_enabled
        // }, {
        //   headers: {
        //     Authorization: token
        //   }
        // }).then(response => {
        //   const { data } = response
        //   console.log(data.returnService)
        //   setServices(data.returnService)
        // })
        toast({
          title: "Service",
          description: "Service updated successfully!",
        })
      } catch (error) {
        console.error('Erro ao atualizar o serviço:', error)
      }
      setLoading(false)
    } else {
      console.log('No changes detected.')
    }
  }

  useEffect(() => {
    const fetchSale = async () => {
      try {
        await api.put(
          `${process.env.HOST}/api/sales/fetchOne`,
          { id: params.slug },
          {
            headers: {
              Authorization: token
            }
          }
        ).then(response => {
          if (response) {
            const { data } = response
            setSales(data)
            form.setValue('service', data.service)
            form.setValue('nameCliente', data.name_client)
            form.setValue('emailCliente', data.email_client)
            form.setValue('descriptionCliente', data.description_client)
          }
        })
      } catch (error) {
        console.error('Erro ao fazer consulta à API:', error)
      }
    }

    fetchSale()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <Template slug="Sales" title="Sales">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <main className="mx-auto w-3/5  select-none">
            <div className="flex justify-between gap-4 pb-4">
              <div className="flex flex-row gap-4 items-center">
                <Button className="border dark:border-gray-50 dark:bg-black-50 dark:text-white bg-white text-black border-white-50 h-7 w-7 p-0 justify-center items-center dark:hover:bg-gray-50/50 hover:bg-white-50">
                  <MdKeyboardArrowLeft size={24} />
                </Button>
                <H3>Edit form</H3>
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
                            <Input {...field} defaultValue={sales?.name_client} />
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
                            <Input
                              type="email" {...field} 
                              defaultValue={sales?.email_client} 
                            />
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
                            <Textarea 
                              {...field} 
                              defaultValue={sales?.description_client}
                              />
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
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services && (
                                <>
                                  {services.map(e => (
                                    <SelectItem key={e._id} value={e._id}>
                                      {e.name}
                                    </SelectItem>
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