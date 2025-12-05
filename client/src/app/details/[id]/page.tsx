"use client"
import { ChevronLeft, CheckCircle2 } from "lucide-react"; 
import ConsultHistoricCard from "@/components/ConsultHistoricCard";
import PetAvatar from "@/components/AvatarPet";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import ModalPetConsult from "@/components/ModalPetConsult";
import LoadingPet from "@/components/LoadingPet";

enum ConsultType{
	FIRST = "FIRST",
	RETURN = "RETURN",
	CHECKUP = "CHECKUP",
	VACINATION = "VACINATION"
}

interface Consulta {
    id: number;
    patientId: number;
    datetime: string;
    type: ConsultType;
    description: string;
    doctorName: string;
}

interface Paciente {
    id: number;
    name: string;
    tutorName: string;
    age: number;
    species: string;
}

// mapeamento do tipo de consulta
const ConsultTypeValues: Record<ConsultType, string> = {
    [ConsultType.FIRST]: "Primeira consulta",
    [ConsultType.RETURN]: "Retorno",
    [ConsultType.CHECKUP]: "Check-up",
    [ConsultType.VACINATION]: "Vacinação",
}

const getConsulta = async (id: number) => {
    const response = await api.get<{value: Consulta}>(`/consultas/${id}`);
    return response.data.value;
}

const getPaciente = async (id: number) => {
    const response = await api.get<{value: Paciente}>(`/patient/${id}`);
    return response.data.value;
}

const getPacienteConsultas = async (id: number) => {
    const response = await api.get<{values: Consulta[]}>(`/consultas/paciente/${id}`);
    return response.data.values;
}

function formatarData(isoString: string) {
    const date = new Date(isoString);
    
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); 
    const hora = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${dia}/${mes} ${hora}:${min}`;
}

export default function Detalhes() {

    const router = useRouter()
    
    const params = useParams();
    const id = params.id as string;

    const [consulta, setConsulta] = useState<Consulta | null>(null);
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [consultasPaciente, setConsultasPaciente] = useState<Consulta[] | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalopen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (!id) return;

        const buscarDados = async () => {
            try {
                const dataConsulta = await getConsulta(Number(id));
                const dataPaciente = await getPaciente(Number(dataConsulta.patientId));
                const dataConsultasPaciente = await getPacienteConsultas((dataConsulta.patientId));
                
                setConsulta(dataConsulta);
                setPaciente(dataPaciente);
                setConsultasPaciente(dataConsultasPaciente);
                
            } catch (error) {
                console.log("Erro ao carregar dados da consulta: ", error);
				throw(error)
            } finally {
				setLoading(false);
			}
        };

        buscarDados();
    }, [id]);

    return (
        <div className="min-h-screen md:py-10 py-7 pl-6 pr-6 md:pl-10">
        
            <header className="flex items-center gap-2">
                <button className="hover:bg-gray-100 rounded-full transition-colors" onClick={() => router.push(`/`)}>
                    <ChevronLeft size={32} className="text-black" />
                </button>
                <h1 className="md:text-3xl font-[650] text-[26px]">
                    Detalhes da Consulta
                </h1>
            </header>

            {loading? (<LoadingPet message="Buscando prontuário do pet..."/>) : (<main className="grid grid-cols-1 lg:grid-cols-2 md:gap-16">
                
                <section className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold pt-6">
                        Paciente
                    </h2>

                    <div className="flex gap-6 items-start md:flex-row flex-col">
                        <PetAvatar 
                            species={paciente?.species ?? ''}
                            alt={`Foto de ${paciente?.name}`} 
                        />

                        <div className="flex md:flex-col justify-between md:h-[299px] flex-row w-full md:w-auto">
                            <div>
                                <h3 className="text-2xl font-bold capitalize">
                                    {paciente?.name}
                                </h3>
                                <p className="text-lg">
                                    {paciente?.age ? `${paciente.age} ${paciente.age > 1 ? "anos" : "ano"}` : ""}
                                </p>
                            </div>
                            
                            <div className="md:space-y-1">
                                <p className="capitalize text-2xl md:text-base md:font-normal">
                                    {paciente?.tutorName}   
                                </p>
                                <p className="text-lg md:text-base">
                                    {consulta?.doctorName}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">
                            Descrição do problema:
                        </h3>
                        <p className="text-sm">
                            {consulta?.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">
                            Tipo de consulta:
                        </h3>
                        <span className="bg-blue-200 text-blue-800 px-5 py-1 rounded-md font-semibold text-sm">
                            {consulta && ConsultTypeValues[consulta.type]}
                        </span>
                    </div>

                    <div className="p-[24px] border border-gray-300 rounded-3xl flex flex-col items-center gap-6 shadow-sm">
                        <h4 className="font-bold text-lg">
                            Deseja realizar outra consulta?
                        </h4>
                        <button className="gap-1 bg-[#4ADE80] hover:bg-green-400 text-white rounded-full flex items-center justify-center transition-colors shadow-md w-[95%] py-3" onClick={() => setIsModalOpen(true)}>
                            <CheckCircle2 size={20} />
                            Agendamento
                        </button>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4 pt-6">
                        Histórico de Consultas
                    </h2>
                    
                    <div className="flex flex-col overflow-y-auto max-h-screen md:h-[55%]">
                        {consultasPaciente?.filter((consulta) => consulta.id !== Number(id)).map((consulta) => (
                        <ConsultHistoricCard 
                            key={consulta.id}
                            id={consulta.id}
                            dataHora={formatarData(consulta.datetime)}         
                            nomeVeterinario={consulta.doctorName} 
                            tipoConsulta={ConsultTypeValues[consulta.type] as "Vacinação" | "Primeira Consulta" | "Retorno" | "Check-up"}
                        />))}
                    </div>
                </section>

            </main>)}

            <ModalPetConsult isOpen={isModalopen} setIsopen={setIsModalOpen} isAttendingPage={false} idPaciente={Number(paciente?.id)}/>

        </div>
  )
}
