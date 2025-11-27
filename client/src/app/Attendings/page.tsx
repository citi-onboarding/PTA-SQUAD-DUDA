"use client"

import { StaticImageData } from "next/dist/shared/lib/get-img-props"
import { useState } from "react"

import { SheepPic, PigPic, CatPic, CowPic, HorsePic, DogPic } from "@/assets"

import { BotaoAcao } from "@/components/Buttons/index"
import { CirclePlus } from 'lucide-react';

// imports shadcn
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardPet from "@/components/CardConsultaPet/index"
import Calendar28  from '@/components/ui/date-picker'

export default function Attendings() {

  const [PesquisaTerm, setPesquisaTerm] = useState("")
  const [searchActive, setSearchActive] = useState("")

  const consultasFicticias = [
    {
      dataHora: "12/02 09:30",
      nomePet: "Mimi",
      nomeTutor: "Carla Dias",
      nomeVeterinario: "Dr. Roberto Maia",
      tipoConsulta: "Primeira Consulta",
      especiePet: "gato",
      realizado: false,
    },
    {
      dataHora: "20/02 10:15",
      nomePet: "Rex",
      nomeTutor: "João Martins",
      nomeVeterinario: "Dra. Helena Prado",
      tipoConsulta: "Check-up",
      especiePet: "cachorro",
      realizado: false,
    },
    {
      dataHora: "27/09 11:00",
      nomePet: "Lola",
      nomeTutor: "Fernanda Alves",
      nomeVeterinario: "Dr. Paulo Cezar",
      tipoConsulta: "Vacinação",
      especiePet: "ovelha",
      realizado: false,
    },
    {
      dataHora: "15/06 13:45",
      nomePet: "Bilu",
      nomeTutor: "Carlos Neto",
      nomeVeterinario: "Dra. Maria Clara",
      tipoConsulta: "Retorno",
      especiePet: "vaca",
      realizado: false,
    },
    {
      dataHora: "02/02 14:20",
      nomePet: "Thor",
      nomeTutor: "Miguel Rocha",
      nomeVeterinario: "Dr. Henrique Silveira",
      tipoConsulta: "Primeira Consulta",
      especiePet: "cavalo",
      realizado: false,
    },
    {
      dataHora: "05/12 15:10",
      nomePet: "Pingo",
      nomeTutor: "Bruna Farias",
      nomeVeterinario: "Dra. Camila Torres",
      tipoConsulta: "Check-up",
      especiePet: "porco",
      realizado: false,
    },
    {
      dataHora: "31/12 16:00",
      nomePet: "Nina",
      nomeTutor: "Ricardo Mendes",
      nomeVeterinario: "Dr. Gustavo Lima",
      tipoConsulta: "Vacinação",
      especiePet: "gato",
      realizado: false,
    },
  ];
  const consultasFicticiasRealizadas = [
    {
      dataHora: "11/11 13:45",
      nomePet: "Bilu",
      nomeTutor: "Carlos Neto",
      nomeVeterinario: "Dra. Maria Clara",
      tipoConsulta: "Retorno",
      especiePet: "vaca",
      realizado: true,
    },
    {
      dataHora: "09/03 14:20",
      nomePet: "Thor",
      nomeTutor: "Miguel Rocha",
      nomeVeterinario: "Dr. Henrique Silveira",
      tipoConsulta: "Primeira Consulta",
      especiePet: "cavalo",
      realizado: true,
    },
    {
      dataHora: "18/04 15:10",
      nomePet: "Pingo",
      nomeTutor: "Bruna Farias",
      nomeVeterinario: "Dra. Camila Torres",
      tipoConsulta: "Check-up",
      especiePet: "porco",
      realizado: true,
    },
    {
      dataHora: "22/01 16:00",
      nomePet: "Nina",
      nomeTutor: "Ricardo Mendes",
      nomeVeterinario: "Dr. Gustavo Lima",
      tipoConsulta: "Vacinação",
      especiePet: "gato",
      realizado: true,
    },
  ];

  const filteredConsultas = consultasFicticias.filter((CardPet) => 
  CardPet.nomeVeterinario.toLowerCase().includes(searchActive.toLowerCase())
  )
  const filteredConsultasRealizadas = consultasFicticiasRealizadas.filter((CardPet) => 
  CardPet.nomeVeterinario.toLowerCase().includes(searchActive.toLowerCase())
  )

  const handleBuscar = () => {
    setSearchActive(PesquisaTerm)
  }

  return (
    <div className="flex flex-col mx-4 md:mx-8 lg:mx-[134px] xl:mx-[194px] h-[660px] justify-between">
      <div>
        <p className="text-[48px] font-bold">Atendimento</p>
        <h1 className="text-[20px] mb-5 mt-4">Qual é o médico?</h1>
      <div className="flex flex-row gap-4">
          <Input className="w-[500px] h-[42px] border-gray-900" placeholder="Pesquise aqui..." 
           onChange={(e) => setPesquisaTerm(e.target.value)}
          />
          <BotaoAcao
            texto="Buscar"
            cor="bg-roxo hover:bg-roxoHover"
            width="116px"
            onClick={handleBuscar}
          />
      </div>
      <Tabs defaultValue="Agendamento" className="mt-6">
        
        <div className="flex flex-row w-full justify-between">
            <TabsList className="w-[240px] h-[50px]">
              <TabsTrigger className="w-[150px] h-[36px]" value="Agendamento">Agendamento</TabsTrigger>
              <TabsTrigger className="h-[36px]" value="Histórico">Histórico</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Calendar28/>
              <Calendar28/>
            </div>
        </div>
          
          <TabsContent value="Agendamento" className="w-full max-h-[270px] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 grid-flow-row-dense gap-2 mt-4 ">
              {filteredConsultas.map((item, index) => (
                <CardPet key={index} {...item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="Histórico" className="w-full max-h-[270px] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 grid-flow-row-dense gap-2 mt-4 ">
              {filteredConsultasRealizadas.map((item, index,) => (
                <CardPet key={index} {...item} />
              ))}
            </div>
          </TabsContent>
      </Tabs> 
      </div>     
      <div className="flex justify-end">
          <BotaoAcao
            texto="Nova Consulta"
            icon={<CirclePlus />}
            cor="bg-verde hover:bg-verdeHover"
            width="180px"
            onClick={() => {}}
          />
      </div>
    </div>
  )
}
