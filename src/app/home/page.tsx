import { MdOutlineAttachMoney } from "react-icons/md";
import Link from "next/link";

import Template from "@/components/Template";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Span } from "@/components/Text/span";

export default function Page() {
  return (
    <main>
      <Template slug="dashboard" title="Dashboard">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <Label className="tracking-tight text-sm font-medium">
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
              <Label className="tracking-tight text-sm font-medium">
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
              <Label className="tracking-tight text-sm font-medium">
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
              <Label className="tracking-tight text-sm font-medium">
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
      </Template>
    </main>
  );
}
