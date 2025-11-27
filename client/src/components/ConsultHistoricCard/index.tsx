import React from 'react';
import { Card } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react';
import { cn } from "@/utils";

export interface ConsultHistoricCardProps {
  id: number;
  dataHora: string;
  nomeVeterinario: string;
  tipoConsulta: 'Primeira Consulta' | 'Retorno' | 'Check-up' | 'Vacinação';
};

export default function ConsultHistoricCard({dataHora, nomeVeterinario, tipoConsulta}: ConsultHistoricCardProps) {

  return(
    <Card className={cn("flex flex-row justify-between rounded-2xl  w-[510px] h-[82px] p-4 px-[24px] mb-6 bg-[#D9D9D9]")}>
        <section className='flex flex-col p-[6px] items-center justify-center p-2 rounded-md font-bold text-sm bg-white/50'>
          <p className='max-w-10'>{dataHora}</p>
        </section>
       
        <section className='text-base flex items-center font-bold'>
          {tipoConsulta}
        </section>

        <section className='text-base flex items-center'>
          {nomeVeterinario}
        </section>

        <section className='text-base flex items-center'>
          <ArrowRight/>
        </section>
    </Card>
  )
}