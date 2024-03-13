"use client";
import { MdOutlineAttachMoney } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Template from "@/components/Template";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Span } from "@/components/Text/span";

const data = [
  {
    name: "Jan",
    uv: 500,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 2490,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 1490,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: 3000,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3500,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 1900,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 1200,
    amt: 2100,
  },
];

export default function Page() {
  let CompanyBox = (props: any) => {
    let { x, y, width, height, fill } = props;

    return (
      <svg>
        <defs>
          <linearGradient id="CompanyBox" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: fill[0], stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: fill[1], stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d={`m${x},${height + y} v-${height} c0-2.1,1.7-3.8,3.8-3.8 h${
            width - 8
          } c2.1,0,3.8,1.7,3.8,3.8 v${height} z`}
          fill="url(#CompanyBox)"
        />
      </svg>
    );
  };

  const toPercent = (decimal: number, fixed = 0) => `$${decimal}`;
  return (
    <main>
      <Template slug="dashboard" title="Dashboard">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <Label className="tracking-tight text-sm font-semibold">
                Total Revenue
              </Label>
              <MdOutlineAttachMoney size={18} className="text-gray-10" />
            </div>
            <div className="p-6 pt-0 flex flex-col">
              <Label className="text-2xl font-bold">$45,231.89</Label>
              <Span>+20.1% from last month</Span>
            </div>
          </Card>
          <Card>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <Label className="tracking-tight text-sm font-semibold">
                Total Revenue
              </Label>
              <MdOutlineAttachMoney size={18} className="text-gray-10" />
            </div>
            <div className="p-6 pt-0 flex flex-col">
              <Label className="text-2xl font-bold">$45,231.89</Label>
              <Span>+20.1% from last month</Span>
            </div>
          </Card>
          <Card>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <Label className="tracking-tight text-sm font-semibold">
                Total Revenue
              </Label>
              <MdOutlineAttachMoney size={18} className="text-gray-10" />
            </div>
            <div className="p-6 pt-0 flex flex-col">
              <Label className="text-2xl font-bold">$45,231.89</Label>
              <Span>+20.1% from last month</Span>
            </div>
          </Card>
          <Card>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <Label className="tracking-tight text-sm font-semibold">
                Total Revenue
              </Label>
              <MdOutlineAttachMoney size={18} className="text-gray-10" />
            </div>
            <div className="p-6 pt-0 flex flex-col">
              <Label className="text-2xl font-bold">$45,231.89</Label>
              <Span>+20.1% from last month</Span>
            </div>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4">
            <div className="flex flex-col space-y-1.5 p-6">
              <Label className="font-semibold text-md">Overview</Label>
            </div>
            <div className="p-6 pt-0 pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "#A1A1AA", fontWeight: "500" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={toPercent}
                    tick={{ fontSize: 12, fill: "#A1A1AA", fontWeight: "500" }}
                  />
                  <Tooltip />
                  <Bar dataKey="uv" fill="#09090B" shape={<CompanyBox />} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </Template>
    </main>
  );
}
