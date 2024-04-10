"use client";
import Template from "@/components/Template";
import { useTheme } from "next-themes";
import RequireAuthentication from "@/lib/withAuth";

import Image from "next/image";

import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface Service {
  id: number;
  name: string;
  type: string;
  description?: string;
  amount: number;
  is_enabled: boolean;
  created: string;
}

function Page() {
  const services: Service[] = [
    {
      id: 1,
      name: "Service 1",
      type: "Service Type 1",
      description:
        "Lorem ipsum is placeholder text commonly used in the graphic, print,",
      created: "2023-06-24",
      amount: 10,
      is_enabled: true,
    },
    {
      id: 2,
      name: "Service 2",
      type: "Service Type 2",
      description:
        "Lorem ipsum is placeholder text commonly used in the graphic, print,",
      amount: 15,
      created: "2023-06-24",
      is_enabled: true,
    },
  ];

  return (
    <Template slug="dashboard" title="Dashboard">
      <main className="grid flex-1 items-start gap-4 md:gap-8 mb-4">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Description
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((e) => (
                      <TableRow className="bg-accent" key={e.id}>
                        <TableCell>
                          <div className="font-medium">{e.name}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {e.type}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {e.description}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {e.created}
                        </TableCell>
                        <TableCell className="text-right">
                          ${e.amount}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="sm"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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