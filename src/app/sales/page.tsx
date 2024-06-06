"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AuthContext } from "@/Contexts/AuthContext";
import Template from "@/components/Template";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

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

function Page() {
  const { token, limitCharacters } = useContext(AuthContext);
  const [sales, setSales] = useState<ISales | any>({} as ISales)
  const router = useRouter()
  const columns: ColumnDef<ISales>[] = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "name_client",
      header: "Name Client"
    },    
    {
      accessorKey: "email_client",
      header: "E-mail Client"
    },
    {
      accessorKey: "service.name",
      header: "Service",
      cell: ({ row }) => {
        return (
          <Badge className="text-xs" variant="secondary">
            {row.original.service?.name ?? 'NULL'}
          </Badge>
        )
      }
    },
    {
      accessorKey: "description_client",
      header: "Description",
      cell: ({ row }) => {
        return limitCharacters(row.original.description_client, 40)
      }
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"))
        const formattedDate = format(date, "dd/MM/yyyy")
  
        return <>{formattedDate}</>
      },
    },
    {
      accessorKey: "service.amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = row.original.service.amount;

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
  
        return <div className="text-right font-medium">{formatted}</div>
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
              <DropdownMenuItem onClick={() => {
                router.push(`/sales/${row.original._id}`)
              }}>Edit</DropdownMenuItem>
              <DropdownMenuItem
                className="dark:hover:bg-red hover:bg-red"
                onClick={() => {
                  
                }}>
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const config = {
          headers: {
            Authorization: token
          }
        }
        const response = await axios.get('api/sales/fetchAll', config)
        if (response) {
          setSales(response.data)
        }

      } catch (error) {
        console.error('Erro ao fazer consulta à API:', error)
      }
    }

    fetchSales()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <Template slug="sales" title="Sales">
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
          <DataTable columns={columns} data={sales} />
        </CardContent>
        <CardFooter>
          <div className="text-xs dark:text-dark-muted-foreground text-white-muted-foreground">
            Showing <strong>1-10</strong> of <strong>{sales.length}</strong> products
          </div>
        </CardFooter>
      </Card>
    </Template>
  );
}

export default Page;
