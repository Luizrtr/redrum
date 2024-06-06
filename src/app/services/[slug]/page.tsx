"use client"
import { useContext, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"

import { useToast } from "@/components/ui/use-toast";
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
import { AuthContext } from "@/Contexts/AuthContext"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { api } from "@/services/api"

type ITypes = {
  _id: string
  name: string
  is_enabled: boolean
}

type IServices = {
  _id: string;
  name: string;
  type: string;
  description: string;
  amount: number;
  is_enabled: boolean;
  createdAt: string;
};

const FormSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  amount: z.any(),
  description: z.string().optional(),
  is_enabled: z.boolean().optional(),
})

function Page({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<IServices>();
  const { token } = useContext(AuthContext)
  const [typesServices, setTypesServices] = useState<ITypes[]>()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit(service: z.infer<typeof FormSchema>) {
    const updatedFields: Partial<IServices> = {}

    if (service.name !== services?.name) {
      updatedFields.name = service.name
    }
    if (service.type !== services?.type) {
      updatedFields.type = service.type
    }
    if (parseInt(service.amount) !== services?.amount) {
      updatedFields.amount = service.amount
    }
    if (service.description !== services?.description) {
      updatedFields.description = service.description
    }
    if (service.is_enabled !== services?.is_enabled) {
      updatedFields.is_enabled = service.is_enabled
    }

    if (Object.keys(updatedFields).length > 0) {
      setLoading(true)
      try {
        await api.put(`${process.env.HOST}/api/services/update`, {
          id: services?._id,
          name: service.name,
          amount: service.amount,
          type: service.type,
          description: service.description,
          is_enabled: service.is_enabled
        }, {
          headers: {
            Authorization: token
          }
        }).then(response => {
          const { data } = response
          console.log(data.returnService)
          setServices(data.returnService)
        })
        toast({
          title: "Service",
          description: "Service updated successfully!",
        });        
      } catch (error) {
        console.error('Erro ao atualizar o serviço:', error)
      }
      setLoading(false)
    } else {
      console.log('No changes detected.')
    }
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
  useEffect(() => {
    const fetchService = async () => {
      try {
        await api.put(
          c
          { id: params.slug },
          {
            headers: {
              Authorization: token
            }
          }
        ).then(response => {
          if (response) {
            const { data } = response
            setServices(data)

            if (data.type_id || data.type) {
              form.setValue('type', data.type_id ?? data.type)
            } else {
              form.setValue('type', data.type_id ?? data.type)
            }

            form.setValue('is_enabled', data.is_enabled)
            form.setValue('name', data.name)
            form.setValue('amount', data.amount)
            form.setValue('description', data.description)
          }
        })
      } catch (error) {
        console.error('Erro ao fazer consulta à API:', error)
      }
    }

    fetchService()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Template slug="services" title="Services">
      <Card className="bg-white dark:bg-black lg:w-1/2 w-full mx-auto">
        <div className="flex flex-col p-6 space-y-1">
          <H3>Edit service</H3>
          <Span>
            Make changes to your service here. click save when you're done.
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
                        <Input {...field} defaultValue={services?.name} />
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl className="col-span-3">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typesServices && (
                            <>
                              {typesServices.map(e => (
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
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Amount</FormLabel>
                      <FormControl className="col-span-3">
                        <Input
                          id="amount"
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
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
                        <Textarea
                          id="description"
                          {...field}
                          defaultValue={services?.description}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_enabled"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Active</FormLabel>
                      <FormControl className="col-span-3">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={() => router.push('/services')}>Close</Button>
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