"use client";
import { TopBarLogo } from "@/assets";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab =
    pathname === "/" ? "attendings" :
    pathname.startsWith("/Register") ? "register" :
    "";

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-row justify-between items-center h-[70px] w-full px-4 md:px-8 bg-white border-b border-[#D9D9D9] gap-4">
      <div>
        <Image src={TopBarLogo} alt="Logo Citi" className="h-10 w-auto" />
      </div>

      <Tabs value={activeTab}>
        <TabsList className="bg-transparent p-0 gap-3 md:gap-6 mt-1.5">

          <TabsTrigger
            value="attendings"
            onClick={() => router.push('/')}
            className="
              rounded-none p-0 pb-1 text-gray-600
              data-[state=active]:shadow-none
              data-[state=active]:text-black 
              data-[state=active]:border-b-2 
              data-[state=active]:border-[#50E678]"
          >
            <Link href="/" className="hover:text-[#7D1AD7]">
              Atendimento
            </Link>
          </TabsTrigger>

          <TabsTrigger
            value="register"
            onClick={() => router.push('/Register')}
            className="
              rounded-none p-0 pb-1 text-gray-600
              data-[state=active]:shadow-none
              data-[state=active]:text-black 
              data-[state=active]:border-b-2 
              data-[state=active]:border-[#50E678]"
          >
            <Link href="/Register" className="hover:text-[#7D1AD7]">
              Cadastro
            </Link>
          </TabsTrigger>

        </TabsList>
      </Tabs>

      <div>
        <p className="text-[#7D1AD7] text-sm font-medium">
          Made with <strong>&lt; / &gt;</strong> and{" "}
          <strong>&hearts;</strong> by CITi
        </p>
      </div>
    </div>
  );
}
