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

type ISales = {
  _id: string;
  createdAt: string;
  description_client: string;
  email_client: string;
  name_client: string;
  service: { 
    amount: number;
    createdAt: string;
    description: string;
    is_enabled: boolean;
    name: string;
    type: string;
    _id: string;
  }
  status: {
    createdAt: string;
    is_enabled: boolean;
    name: string;
    id: number;
  }
}

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
  const [sales, setSales] = useState<ISales>();
  const { token } = useContext(AuthContext)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit(service: z.infer<typeof FormSchema>) {
    const updatedFields: Partial<ISales> = {}

    if (service.name !== sales?.name) {
      updatedFields.name = service.name
    }
    if (service.type !== sales?.type) {
      updatedFields.type = service.type
    }
    if (parseInt(service.amount) !== sales?.amount) {
      updatedFields.amount = service.amount
    }
    if (service.description !== sales?.description) {
      updatedFields.description = service.description
    }
    if (service.is_enabled !== sales?.is_enabled) {
      updatedFields.is_enabled = service.is_enabled
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

            // if (data.type_id || data.type) {
            //   form.setValue('type', data.type_id ?? data.type)
            // } else {
            //   form.setValue('type', data.type_id ?? data.type)
            // }

            // form.setValue('is_enabled', data.is_enabled)
            // form.setValue('name', data.name)
            // form.setValue('amount', data.amount)
            // form.setValue('description', data.description)
          }
        })
      } catch (error) {
        console.error('Erro ao fazer consulta à API:', error)
      }
    }

    fetchSale()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Template slug="Sales" title="Sales">
      <Card className="bg-white dark:bg-black lg:w-1/2 w-full mx-auto">
        <div className="flex flex-col p-6 space-y-1">
          <H3>Edit sales</H3>
          <Span>
            Make changes to your sales here. click save when you're done.
          </Span>
        </div>
        <div className="p-6 pt-0">
        </div>

      </Card>
    </Template>
  )
}
export default Page