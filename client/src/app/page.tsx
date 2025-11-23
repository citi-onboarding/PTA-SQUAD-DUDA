"use client"
import Image from "next/image";

import { LogoCITi } from "../assets";
import { BotaoAcao } from "@/components/Buttons";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-black">
        <BotaoAcao
          texto="Salvar"
          onClick={() => {}}
          cor="bg-[#50E678] hover:bg-[#2a9c48ff]"
          width={88}
        />
    </div>
  );
}
