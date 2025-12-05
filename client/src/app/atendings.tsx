"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { parseISO, format, isValid, startOfDay } from 'date-fns';
import ModalPetConsult from "@/components/ModalPetConsult";

import { BotaoAcao } from "@/components/Buttons/index"
import { CirclePlus } from 'lucide-react';

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardPet from "@/components/CardConsultaPet/index"

import api from "@/services/api"

type TipoConsulta = 'FIRST' | 'VACINATION' | 'RETURN' | 'CHECKUP';
type EspeciePet = 'SHEEP' | 'CAT'| 'PIG' | 'COW' | 'HORSE' | 'DOG';

type Consulta = {
  id: number
  dataHora: string 
  dataFormatted: Date
  nomePet: string
  nomeTutor: string
  nomeVeterinario: string
  tipoConsulta: TipoConsulta
  especiePet: EspeciePet
}

export default function Attendings() {
  const [PesquisaTerm, setPesquisaTerm] = useState("")
  const [searchActive, setSearchActive] = useState("")
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const router = useRouter();
  const [isModalopen, setIsModalOpen] = useState(false);

  async function getConsultas() {
    try {
      const [cRes, pRes] = await Promise.all([api.get('/consultas'), api.get('/patient')]);
      const rawConsultas = cRes.data?.values ?? cRes.data ?? [];
      const rawPacientes = Array.isArray(pRes.data) ? pRes.data : (pRes.data?.values ?? []);

      const patientsById: Record<number, any> = {};
      for (const p of rawPacientes) if (p && typeof p.id === 'number') patientsById[p.id] = p;

      const mapped = (Array.isArray(rawConsultas) ? rawConsultas : []).map((item: any) => {
        let dataHora = parseISO(item.datetime ?? item.dataHora ?? '');
        if (!isValid(dataHora)) dataHora = new Date();

        const dataString = format(dataHora, 'dd/MM/yyyy HH:mm');
        const patient = patientsById[item.patientId];
        
        return {
          id: item.id,
          dataHora: dataString, 
          dataFormatted: dataHora, 
          nomePet: patient?.name ?? `Paciente #${item.patientId}`,
          nomeTutor: patient?.tutorName ?? patient?.tutor ?? '—',
          nomeVeterinario: item.doctorName ?? '—',
          tipoConsulta: item.type,
          especiePet: patient?.species ?? 'CAT'
        } as Consulta;
      });

      setConsultas(mapped);
    } catch (error) {
      console.error("Erro ao carregar consultas/pacientes:", error);
      setConsultas([]);
    }
  }

  useEffect(() => { getConsultas(); }, []);

  type DatePickerProps = {
    value?: Date | undefined
    onChange: (d?: Date) => void
  }
  
  function DateFromPicker({ value, onChange}: DatePickerProps) {
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
  
  function DateToPicker({ value, onChange }: DatePickerProps) {
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

  // verifica o intervalo de datas usando o objeto Date
  const inDateRange = (d: Date) => {
    if (!dateFrom && !dateTo) return true;
    
    const target = startOfDay(d); 
    const from = dateFrom ? startOfDay(dateFrom) : null;
    const to = dateTo ? startOfDay(dateTo) : null;

    if (from && to) return target >= from && target <= to;
    if (from) return target >= from;
    if (to) return target <= to;
    return true;
  }

  const dataAtual = new Date();

  const baseFilteredConsultas = consultas.filter((consulta) => {
    const matchesSearch = consulta.nomeVeterinario.toLowerCase().includes(searchActive.toLowerCase())
    return matchesSearch && inDateRange(consulta.dataFormatted)
  })

  const filteredConsultas = baseFilteredConsultas.filter(c => c.dataFormatted >= dataAtual);
  const filteredConsultasRealizadas = baseFilteredConsultas.filter(c => c.dataFormatted < dataAtual);

  const handleBuscar = () => setSearchActive(PesquisaTerm)

  // Função única para navegar para a página de detalhes
  const handleViewDetails = (id: number) => {
    router.push(`/details/${id}`);
  }

  return (

    <div className="flex flex-col mt-[25px] mx-4 md:mx-8 lg:mx-[134px] xl:mx-[194px] h-[660px] justify-between">
      <div>
        <p className="md:text-[48px] text-[32px] font-bold">Atendimento</p>
        <h1 className="md:text-[20px] text-lg mb-5 mt-4">Qual é o médico?</h1>
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

          <div className="flex md:flex-row flex-col w-full md:justify-between gap-4 items-center justify-center">
            <TabsList className="md:w-[240px] h-[50px]">
              <TabsTrigger className="w-[150px] h-[36px]" value="Agendamento">Agendamento</TabsTrigger>
              <TabsTrigger className="h-[36px]" value="Histórico">Histórico</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <DateFromPicker value={dateFrom} onChange={setDateFrom}/>
              <DateToPicker value={dateTo} onChange={setDateTo} />
            </div>
          </div>

          {/* Agendamentos: */}
          <TabsContent value="Agendamento" className="w-full max-h-[270px] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 grid-flow-row-dense gap-4 mt-4 ">
              {filteredConsultas.map((card) => {
                const partialDate = format(card.dataFormatted, 'dd/MM HH:mm');

                return (
                  <div key={card.id} onClick={() => handleViewDetails(card.id)} className="cursor-pointer">
                    {/* passei o onclick direto no elemento pois a div que os cards estão sendo renderizados meio que "agrupa" eles em um elemento só */}
                    <CardPet 
                      dataHora={partialDate}
                      nomePet={card.nomePet}
                      nomeTutor={card.nomeTutor}
                      nomeVeterinario={card.nomeVeterinario}
                      tipoConsulta={card.tipoConsulta}
                      especiePet={card.especiePet}
                    />
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {/* Histórico: */}
          <TabsContent value="Histórico" className="w-full max-h-[270px] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 grid-flow-row-dense gap-4 mt-4 ">
              {filteredConsultasRealizadas.map(card => {
                const partialDate = format(card.dataFormatted, 'dd/MM HH:mm');

                return (
                    <div key={card.id} onClick={() => handleViewDetails(card.id)} className="cursor-pointer">
                      <CardPet 
                        dataHora={partialDate}
                        nomePet={card.nomePet}
                        nomeTutor={card.nomeTutor}
                        nomeVeterinario={card.nomeVeterinario}
                        tipoConsulta={card.tipoConsulta}
                        especiePet={card.especiePet}
                        realizado={true}
                      />
                    </div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex md:justify-end mb-6 justify-center">
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
