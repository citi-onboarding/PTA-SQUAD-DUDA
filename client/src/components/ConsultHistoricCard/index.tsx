import React from 'react';
import { Card } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react';
import { cn } from "@/utils";
import { useRouter } from 'next/navigation';

export interface ConsultHistoricCardProps {
    id: number;
    dataHora: string;
    nomeVeterinario: string;
    tipoConsulta: 'Primeira Consulta' | 'Retorno' | 'Check-up' | 'Vacinação';
};

export default function ConsultHistoricCard({id, dataHora, nomeVeterinario, tipoConsulta}: ConsultHistoricCardProps) {

    const router = useRouter()

    return(
    <Card className={cn("flex flex-row justify-between rounded-2xl w-[95%] h-[82px] py-[16px] px-[24px] mb-6 bg-[#D9D9D9]")}>
        <div className='flex flex-col items-center justify-center p-2 rounded-md font-bold text-sm bg-white/50'>
            <p className='max-w-10'>
                {dataHora}
            </p>
        </div>
        
        <div className='text-base flex items-center font-bold text-center text-xs md:text-base'>
            {tipoConsulta}
        </div>

        <div className='text-base flex items-center text-center text-xs md:text-base'>
            {nomeVeterinario}
        </div>

        <button 
            onClick={() => router.push(`/details/${id}`)}
            className='text-base flex items-center justify-center text-center p-2 rounded-full hover:bg-black/10 transition-colors cursor-pointer'
        >
            <ArrowRight/>
        </button>
    </Card>
  )
}