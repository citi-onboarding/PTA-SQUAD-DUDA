import { TopBarLogo } from "@/assets";
import Image from "next/image";
import Link from 'next/link';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function TopBar() {
    return(
        <div className="absolute top-0 left-0 z-50 flex flex-row justify-between items-center h-[70px] w-full px-4 md:px-8 bg-white border-b border-[#D9D9D9] gap-4">

            <div className=""> 
                <Image src={TopBarLogo} alt="Logo Citi" className="h-10 w-auto" />
            </div>

            <Tabs defaultValue="atendimento">
                <TabsList className="bg-transparent p-0 gap-3 md:gap-6 mt-1.5">

                    <TabsTrigger value="atendimento"
                        className="
                            rounded-none 
                            p-0 
                            pb-1 
                            text-gray-600 
                            data-[state=active]:shadow-none 
                            data-[state=active]:text-black 
                            data-[state=active]:border-b-2 
                            data-[state=active]:border-[#50E678]"
                    >
                                <Link href="/atendimento" className="hover:text-[#7D1AD7] ">Atendimento</Link>
                    </TabsTrigger>

                    <TabsTrigger value="cadastro"
                        className="
                            rounded-none 
                            p-0 
                            pb-1 
                            text-gray-600 
                            data-[state=active]:shadow-none 
                            data-[state=active]:text-black 
                            data-[state=active]:border-b-2 
                            data-[state=active]:border-[#50E678]"
                    >
                                <Link href="/cadastro" className="hover:text-[#7D1AD7] ">Cadastro</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
           
            <div className="">
                <p className="text-[#7D1AD7] text-sm font-medium">
                    Made with <strong>&lt; &#x0002F; &gt;</strong> and{" "} <strong>&hearts;</strong> by CITi
                </p>
            </div>  

        </div>
    )
}