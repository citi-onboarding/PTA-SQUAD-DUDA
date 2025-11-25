"use client"

import { StaticImageData } from "next/dist/shared/lib/get-img-props"


import { SheepPic, PigPic, CatPic, CowPic, HorsePic, DogPic } from "@/assets"

// imports shadcn
import { Input } from "@/components/ui/input"
import { BotaoAcao } from "@/components/Buttons/index"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import  CardPet from "@/components/CardConsultaPet/index"


enum PetSpecies {
    SHEEP,
    CAT,
    PIG,
    COW,
    HORSE,
    DOG
}
enum ConsultType{
    PRIMEIRA_CONSULTA,
    RETORNO,
    CHECKUP,
    VACINACAO
}

// mapeamento das informações padrão
const speciesAssets: Record<PetSpecies, StaticImageData> = {
    [PetSpecies.SHEEP]: SheepPic,
    [PetSpecies.CAT]: CatPic,
    [PetSpecies.PIG]: PigPic,
    [PetSpecies.COW]: CowPic,
    [PetSpecies.HORSE]: HorsePic,
    [PetSpecies.DOG]: DogPic,
}
const ConsultTypeValues: Record<ConsultType, string> = {
    [ConsultType.PRIMEIRA_CONSULTA]: "Primeira consulta",
    [ConsultType.RETORNO]: "Retorno",
    [ConsultType.CHECKUP]: "Check-up",
    [ConsultType.VACINACAO]: "Vacinação",
}

export default function Register(){
    const ola = console.log("ola")

    const consultasFicticias = [
  {
    dataHora: "09:30",
    nomePet: "Mimi",
    nomeTutor: "Carla Dias",
    nomeVeterinario: "Dr. Roberto Maia",
    tipoConsulta: "Primeira Consulta",
    especiePet: "gato",
  },
  {
    dataHora: "10:15",
    nomePet: "Rex",
    nomeTutor: "João Martins",
    nomeVeterinario: "Dra. Helena Prado",
    tipoConsulta: "Check-up",
    especiePet: "cachorro",
  },
  {
    dataHora: "11:00",
    nomePet: "Lola",
    nomeTutor: "Fernanda Alves",
    nomeVeterinario: "Dr. Paulo Cezar",
    tipoConsulta: "Vacinação",
    especiePet: "ovelha",
  },
  {
    dataHora: "13:45",
    nomePet: "Bilu",
    nomeTutor: "Carlos Neto",
    nomeVeterinario: "Dra. Maria Clara",
    tipoConsulta: "Retorno",
    especiePet: "vaca",
  },
  {
    dataHora: "14:20",
    nomePet: "Thor",
    nomeTutor: "Miguel Rocha",
    nomeVeterinario: "Dr. Henrique Silveira",
    tipoConsulta: "Primeira Consulta",
    especiePet: "cavalo",
  },
  {
    dataHora: "15:10",
    nomePet: "Pingo",
    nomeTutor: "Bruna Farias",
    nomeVeterinario: "Dra. Camila Torres",
    tipoConsulta: "Check-up",
    especiePet: "porco",
  },
  {
    dataHora: "16:00",
    nomePet: "Nina",
    nomeTutor: "Ricardo Mendes",
    nomeVeterinario: "Dr. Gustavo Lima",
    tipoConsulta: "Vacinação",
    especiePet: "gato",
  },
];


    return (
        <div className="mx-4 md:mx-10 lg:mx-[194px] mt-[25px]">
            <p className="text-[48px] font-bold">Atendimento</p>
            <div className="w-[]">
                <h1 className="text-[20px] mb-5 mt-4">Qual é o médico?</h1>
                <div className="flex flex-row gap-4">
                    <Input className="w-[500px] h-[42px] border-gray-900" placeholder="Pesquise aqui..."/>
                    <BotaoAcao 
                    texto="Buscar"
                    cor="bg-roxo hover:bg-roxoHover"
                    width="116px"
                    onClick={()=>ola}
                     />
                </div>
                <Tabs defaultValue="Agendamento" className="w-[400px] mt-6">
                    <TabsList className="w-[240px] h-[50px]">
                        <TabsTrigger className="w-[150px] h-[36px]" value="Agendamento">Agendamento</TabsTrigger>
                        <TabsTrigger className="h-[36px]" value="Histórico">Histórico</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Agendamento" className="grid grid-rows-3 grid-col-2 grid-flow-col">
                        <div className="p-6 flex flex-col items-center">
                        {consultasFicticias.map((item, index) => (
                            <CardPet key={index} {...item} />
                        ))}
                        </div>

                    </TabsContent>
                    <TabsContent value="Histórico">Change your password here.</TabsContent>
                </Tabs>
            </div>
        </div>
    )
}