"use client"
import { useState } from "react"
import { format } from "date-fns"
import ModalPetConsult from "@/components/ModalPetConsult"

import { BotaoAcao } from "@/components/Buttons/index"
import { CirclePlus } from 'lucide-react';

// imports shadcn
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardPet from "@/components/CardConsultaPet/index"

type DatePickerProps = {
  value?: Date | undefined
  onChange: (d?: Date) => void
  label?: string
}
function DateFromPicker({ value, onChange, label = "De" }: DatePickerProps) {
  return (
    <div className="w-auto ">
      <Input
        type="date"
        value={value ? format(value, "yyyy-MM-dd") : ""}
        onChange={(e: any) => onChange(e.target.valueAsDate ?? undefined)}
        className="h-[42px]"
      />
    </div>
  )
}
function DateToPicker({ value, onChange, label = "Até" }: DatePickerProps) {
  return (
    <div className="w-auto">
      <Input
        type="date"
        value={value ? format(value, "yyyy-MM-dd") : ""}
        onChange={(e: any) => onChange(e.target.valueAsDate ?? undefined)}
        className="h-[42px] "
      />
    </div>
  )
}

export default function Attendings() {
  const [PesquisaTerm, setPesquisaTerm] = useState("")
  const [searchActive, setSearchActive] = useState("")
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [isModalopen, setIsModalOpen] = useState(false);

  type TipoConsulta = "Primeira Consulta" | "Retorno" | "Check-up" | "Vacinação"

  type EspeciePet = "cachorro" | "ovelha" | "vaca" | "cavalo" | "porco" | "gato";

  const consultasFicticias: {
    dataHora: string
    nomePet: string
    nomeTutor: string
    nomeVeterinario: string
    tipoConsulta: TipoConsulta
    especiePet: EspeciePet
    realizado: boolean
  }[] = [
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
  ];
  const consultasFicticiasRealizadas: {
    dataHora: string
    nomePet: string
    nomeTutor: string
    nomeVeterinario: string
    tipoConsulta: TipoConsulta
    especiePet: EspeciePet
    realizado: boolean
  }[] = [
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

   const parseDataHora = (str: string): Date | null => {
    const regex = /(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/
    const m = str.match(regex)
    if (!m) return null
    const day = Number(m[1])
    const month = Number(m[2]) - 1
    const hour = Number(m[3])
    const minute = Number(m[4])
    const year = new Date().getFullYear()
    return new Date(year, month, day, hour, minute)
  }
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)

   const inDateRange = (d: Date | null) => {
    // se o card não tiver data e usuário definiu um filtro de data -> excluir
    if (!d) return !(dateFrom || dateTo) // se não existe filtro de data, deixa passar
    if (dateFrom && dateTo) return d >= startOfDay(dateFrom) && d <= endOfDay(dateTo)
    if (dateFrom) return d >= startOfDay(dateFrom)
    if (dateTo) return d <= endOfDay(dateTo)
    return true
  }

  const filteredConsultas = consultasFicticias.filter((CardPet) => {
    const matchesSearch = CardPet.nomeVeterinario.toLowerCase().includes(searchActive.toLowerCase())
    const d = parseDataHora(CardPet.dataHora)
    return matchesSearch && inDateRange(d)
  })
  const filteredConsultasRealizadas = consultasFicticiasRealizadas.filter((CardPet) => {
    const matchesSearch = CardPet.nomeVeterinario.toLowerCase().includes(searchActive.toLowerCase())
    const d = parseDataHora(CardPet.dataHora)
    return matchesSearch && inDateRange(d)
  })



  const handleBuscar = () => {
    setSearchActive(PesquisaTerm)
  }

  return (
    <div className="flex flex-col mt-[25px] mx-4 md:mx-8 lg:mx-[134px] xl:mx-[194px] h-[660px] justify-between">
      <div>
        <p className="text-[48px] font-bold">Atendimento</p>
        <h1 className="text-[20px] mb-5 mt-4">Qual é o médico?</h1>
        <div className="flex flex-row gap-4">
          <Input
    className="w-[500px] h-[42px] border-gray-900"
    placeholder="Pesquise aqui..."
    value={PesquisaTerm}
    onChange={(e: any) => setPesquisaTerm(e.target.value)}
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
              <DateFromPicker value={dateFrom} onChange={setDateFrom} />
              <DateToPicker value={dateTo} onChange={setDateTo} />
            </div>
          </div>

          <TabsContent value="Agendamento" className="w-full max-h-[270px] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 grid-flow-row-dense gap-4 mt-4 ">
              {filteredConsultas.map((item, index) => (
                <CardPet key={index} {...item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="Histórico" className="w-full max-h-[270px] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 grid-flow-row-dense gap-4 mt-4 ">
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
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <ModalPetConsult isOpen={isModalopen} setIsopen={setIsModalOpen} isAttendingPage={true} />
    </div>
  )
}
