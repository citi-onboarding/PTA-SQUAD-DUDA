import React from 'react';
import {
  Card
} from "@/components/ui/card"
import { AlarmClock } from 'lucide-react';
import Image, { StaticImageData } from "next/image";
import { CatPic, DogPic, SheepPic, CowPic, HorsePic, PigPic } from '@/assets';
import { cn } from "@/utils";

type CardConsultaPetProps = {
  dataHora: string;
  nomePet: string;
  nomeTutor: string
  nomeVeterinario: string;
  tipoConsulta: 'Primeira Consulta' | 'Retorno' | 'Check-up' | 'Vacinação';
  especiePet: 'gato' | 'cachorro' | 'ovelha' | 'vaca' | 'porco' | 'cavalo'; //adaptei de acordo com ModalPetConsulta de Marcos
};

const tipoConsultaColorMap: Record<CardConsultaPetProps['tipoConsulta'], string> = {
  'Primeira Consulta': 'bg-[#BFB5FF]',
  'Retorno': 'bg-[#ffa275]',
  'Check-up': 'bg-[#9CFF95]',
  'Vacinação': 'bg-[#AAE1FF]',
};

// Mapa que associa a string da espécie ao objeto de imagem importado
const especieImageMap: Record<string, StaticImageData> = {
  gato: CatPic,
  cachorro: DogPic,
  ovelha: SheepPic,
  vaca: CowPic,
  porco: PigPic,
  cavalo: HorsePic,
};

export default function CardPet({dataHora, nomePet, nomeTutor, nomeVeterinario, tipoConsulta, especiePet}: CardConsultaPetProps) {
  const cardColorClass = tipoConsultaColorMap[tipoConsulta];
  const imagemPet = especieImageMap[especiePet] || CatPic; 

  return(
    <Card className={cn("flex flex-row justify-between rounded-2xl max-w-xl w-[450px] h-[100px] p-5 mb-4 border-[0px]", cardColorClass)}>
        <section className='flex flex-col items-center justify-center p-2 rounded-md font-bold text-sm bg-white/50'>
          <AlarmClock size={20} />
          <p className='max-w-10'>{dataHora}</p>
        </section>
        <section className='flex gap-1 text-base items-center'>
          <div className='font-bold'>{nomePet}</div>
          <p>/</p>
          <div>{nomeTutor}</div>
        </section>
        <section className='text-base flex items-center'>
          {nomeVeterinario}
        </section>
        <section className='flex flex-col gap-2 items-center min-w-[120px]'>
          <Image src={imagemPet} alt={`Foto do pet`} width={70} height={70} />
          <div className='flex bg-white/50 p-1 px-2 justify-center text-sm rounded-md w-full text-center'>
            {tipoConsulta}
          </div>
        </section>
    </Card>
  )
}