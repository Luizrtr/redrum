"use client";
import Template from "@/components/Template";
import RequireAuthentication from "@/lib/withAuth";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabsServices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "./data-table";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Contexts/AuthContext";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import Link from "next/link";
import { api } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

type IServices = {
  _id: string;
  name: string;
  type: {
    _id: string;
    createdAt: string;
    is_enabled: boolean;
    name: string;
  }
  description: string;
  amount: number;
  is_enabled: boolean;
  createdAt: string;
};

type ITypes = {
  _id: string;
  name: string;
  is_enabled: boolean;
}
type IDataServices = {
  name: string;
  amount: number;
  description: string;
  type: string;
}

const columns: ColumnDef<IServices>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Service",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = format(date, "dd/MM/yyyy");

      return <>{formattedDate}</>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="sm" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-red">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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

function Page() {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [services, setServices] = useState<IServices | any>({} as IServices);
  const [typesServices, setTypesServices] = useState<ITypes[]>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  async function onSubmit(service: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      await api.post(
        `api/services/create`,
        service,
        {
          headers: {
            Authorization: token
          }
        }
      ).then(response => {
        if (response) {
          const { data } = response
          setServices(data)
          handleResetServices()
        }
      })
      setLoading(true)
    } catch (error) {
      console.error("Error create service: ", error)
      setLoading(true)
    }
  }

  const handleResetServices = () => {
    form.setValue('name', '');
    form.setValue('type', '');
    form.setValue('amount', '');
    form.setValue('description', '');
  }

  useEffect(() => {
    const fetchServies = async () => {
      try {
        const config = {
          headers: {
            Authorization: token
          }
        };
        const response = await axios.get('api/services/fetchAll', config);

        if (response) {
          setServices(response.data);
        }

      } catch (error) {
        console.error('Erro ao fazer consulta à API:', error);
      }
    }

    fetchServies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchTypesServies = async () => {
      try {
        const config = {
          headers: {
            Authorization: token
          }
        };
        const response = await axios.get('api/typeServices/fetchAll', config);

        if (response) {
          setTypesServices(response.data);
        }

      } catch (error) {
        console.error('Erro ao fazer consulta à API:', error);
      }
    }

    fetchTypesServies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Template slug="dashboard" title="Dashboard">
      <main className="grid flex-1 items-start gap-4 md:gap-8 mb-4">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  {!loading ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                          <DialogTitle>Create service</DialogTitle>
                          <DialogDescription>
                            Create your service here. Click save when finished.
                          </DialogDescription>
                        </DialogHeader>
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
                        <DialogFooter>
                          <Button type="submit">Submit</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  ) : (
                    <div className="flex flex-col space-y-3 h-64 w-96">
                      <Skeleton className="h-5/6 w-full rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    </div>
                  )}

                </DialogContent>
              </Dialog>
            </div>
          </div>
          <TabsContent value="all">
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="dark:bg-black-50 bg-white"
            >
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={services} />
              </CardContent>
              <CardFooter>
                <div className="text-xs dark:text-dark-muted-foreground text-white-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </Template>
  );
}

export default RequireAuthentication(Page);