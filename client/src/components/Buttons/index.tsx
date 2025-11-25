"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface BotaoAcaoProps {
  texto: string;
  cor: string;
  icon?: React.ReactNode;
  onClick: () => void;
  width?: number | string; 
}

export function BotaoAcao({
  texto,
  cor = "bg-[#50E678] hover:bg-[#2a9c48ff]",
  icon,
  onClick,
  width,
}: BotaoAcaoProps) {
  const style = width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : undefined;

  return (
    <Button
      onClick={onClick}
      style={style}
      className={`
        flex flex-row items-center gap-[10px]
        h-[48px] py-[12px] px-[32px]
        rounded-[24px] text-base font-bold shadow-md
        text-white
        ${cor}
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{texto}</span>
    </Button>
  );
}
