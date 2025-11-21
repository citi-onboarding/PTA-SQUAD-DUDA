"use client";
import React from "react";
import { Button } from "@/components/ui/button"

interface BotaoAcaoProps {
    texto: string;
    cor: string;
    icon?: React.ReactNode;
    onClick: () => void;
};

// cores do projeto: 
//        verde:"#50E678",
// 				verdeHover:"#2a9c48ff",
// 				roxo:"#7D1AD7",
// 				roxoHover:"#510994ff",

export function BotaoAcao({texto, cor, icon, onClick, }: BotaoAcaoProps) {
  return (
    <Button onClick={onClick}
    className={`flex flex-row items-center gap-[10px] h-[48px] py-[12px] px-[32px] rounded-[24px] text-base font-bold shadow-md ${cor}`}> 
      {icon && <span>{icon}</span>}
      <span>{texto}</span>
    </Button>
  );
}
