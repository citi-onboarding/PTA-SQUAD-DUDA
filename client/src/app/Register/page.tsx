"use client"
import {useForm, Controller} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"

import { StaticImageData } from "next/dist/shared/lib/get-img-props"

import { CalendarIcon, ClockIcon } from "@/assets"
import { SheepPic, PigPic, CatPic, CowPic, HorsePic, DogPic } from "@/assets"

// imports shadcn
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectLabel, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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

const formSchema = z.object({
    patientName: z.string().min(1, "Insira o nome do paciente"),
    tutorName: z.string().min(1, "Insira o nome do tutor"),
    species: z.coerce.number()
        .refine((val) => val in PetSpecies, { message: "Selecione uma espécie" }),
    age: z.string()
        .transform((val) => Number(val)) // converte para number para validar
        .refine((val) => !isNaN(val), { message: "Digite apenas números" })
        .refine((val) => val > 0, { message: "Informe a idade" }),
    consultType: z.coerce.number()
        .refine((val) => val in ConsultType, { message: "Selecione o tipo de consulta" }),
    doctorName: z.string().min(1, "Insira o nome do médico responsável"),
    consultDate: z.date({ 
        error: "Insira a data de consulta"
    }),
    consultTime: z.string().min(1, "Insira o horário da consulta"),
    description: z.string().min(1, "Insira uma descrição"),
})
type RegisterFormValues = z.infer<typeof formSchema>

export default function Register(){
    const { register, control, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(formSchema)
    })

    // função onSubmit de teste para verificar validação
    const onSubmit = (data: RegisterFormValues) => {
        console.log("Formulário válido:", data)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                {/* Bloco 1 - nome do pet e do tutor */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className="flex-1 space-y-2 relative pb-1">
                        <Label htmlFor="patientName" className="text-base font-bold">Nome do Paciente</Label>
                        <Input 
                            id="patientName"
                            placeholder="Digite aqui..."
                            className="h-12 w-full border-black"
                            {...register("patientName")}
                        />
                        {errors.patientName && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.patientName.message}</p>}
                    </div>
                    <div className="flex-1 space-y-2 relative pb-1">
                        <Label htmlFor="tutorName" className="text-base font-bold">Nome do Tutor</Label>
                        <Input 
                            id="tutorName"
                            placeholder="Digite aqui..."
                            className="h-12 w-full border-black"
                            {...register("tutorName")}
                        />
                        {errors.tutorName && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.tutorName.message}</p>}
                    </div>
                </div>

                {/* Bloco 2 - Seletor da espécie */}
                <div className="w-full space-y-4 mt-5">
                    <Label htmlFor="species" className="text-base font-bold">Qual é a espécie do paciente?</Label>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 lg:gap-[60px]">
                        {Object.entries(speciesAssets).map(([key, image]) => (
                            <div key={key} className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 p-3 rounded-md transition-all">
                                <img src={image.src} alt={key} className={`w-full h-full object-contain cursor-pointer ${(Number(key) === PetSpecies.PIG) && 'scale-x-[-1]'}`}/>
                            </div>
                        ))}
                    </div>
                    
                </div>

                {/* Bloco 3 - Idade do paciente e tipo de consulta */}
                <div className="flex flex-col md:flex-row gap-6 w-full mt-5">
                    <div className="flex-1 space-y-2 relative pb-1">
                        <Label htmlFor="age" className="text-base font-bold">Idade do paciente</Label>
                        <Input 
                            id="age"
                            placeholder="Digite aqui..."
                            className="h-12 w-full border-black"
                            {...register("age")}
                        />
                        {errors.age && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.age.message}</p>}
                    </div>
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="consultType" className="text-base font-bold">Tipo da consulta</Label>
                        <Select>
                            <SelectTrigger className="h-12 w-full border-black">
                                <SelectValue placeholder="Selecione aqui" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(ConsultTypeValues).map(([key, label]) => (
                                    <SelectItem key={key} value={label}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Bloco 4 - médico, data e horário */}
                <div className="flex flex-col md:flex-row gap-6 w-full mt-5">
                    <div className="w-full md:w-1/2 space-y-2 relative pb-1">
                        <Label htmlFor="doctorName" className="text-base font-bold">Médico Responsável</Label>
                        <Input 
                            id="doctorName"
                            placeholder="Digite aqui..."
                            className="h-12 w-full border-black"
                            {...register("doctorName")}
                        />
                        {errors.doctorName && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.doctorName.message}</p>}
                    </div>
                    <div className="w-full md:w-1/4 space-y-2">
                        <Label htmlFor="consultDate" className="text-base font-bold">Data do atendimento</Label>
                        <div className="relative">
                            <Input 
                                id="consultDate"
                                type="date"
                                placeholder="dd/mm/aa"
                                className="h-12 w-full border-black pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
                            />
                            <img src={CalendarIcon.src} alt="calendar-icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none"/>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 space-y-2 relative pb-1">
                        <Label htmlFor="consultTime" className="text-base font-bold">Horário do atendimento</Label>
                        <div className="relative">
                            <Input 
                                id="consultTime"
                                type="time"
                                defaultValue="00:00"
                                className="h-12 w-full border-black pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
                                {...register("consultTime")}
                            />
                            <img src={ClockIcon.src} alt="clock-icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                        </div>
                        {errors.consultTime && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.consultTime.message}</p>}
                    </div>
                </div>

                {/* Bloco 5 - descrição do problema */}
                <div className="flex flex-col md:flex-row gap-6 w-full mt-5">
                    <div className="w-full space-y-2 relative pb-1">
                        <Label htmlFor="description" className="text-base font-bold">Descrição do problema</Label>
                        <Textarea 
                            id="description"
                            placeholder="Digite aqui..."
                            className="h-24 w-full border-black"
                            {...register("description")}
                        />
                        {errors.description && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.description.message}</p>}
                    </div>
                </div>
                <button type="submit">Teste</button>
            </form>
        </>
    )
}