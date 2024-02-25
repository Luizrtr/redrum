import Switch from "@/components/Switch";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="mx-auto text-center">
        <Switch label="Theme" />
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
}
