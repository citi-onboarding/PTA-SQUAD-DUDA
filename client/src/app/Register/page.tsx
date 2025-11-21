"use client"
import {useForm, Controller, useController, Control} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import {format} from "date-fns"
import { ptBR } from "date-fns/locale"
import { StaticImageData } from "next/dist/shared/lib/get-img-props"

import { CalendarIcon, ClockIcon } from "@/assets"
import { SheepPic, PigPic, CatPic, CowPic, HorsePic, DogPic } from "@/assets"

// imports shadcn
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectLabel, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/utils"

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

// esquema de configuração de validação
const formSchema = z.object({
    patientName: z.string().min(1, "Insira o nome do paciente"),
    tutorName: z.string().min(1, "Insira o nome do tutor"),
    species: z.custom<number>((val) => typeof val === 'number', "Selecione uma espécie"),
    age: z.string()
        .transform((val) => Number(val)) // converte para number para validar
        .refine((val) => !isNaN(val), { message: "Digite apenas números" })
        .refine((val) => val > 0, { message: "Informe a idade" }),
    consultType: z.custom<number>((val) => typeof val === 'number', "Selecione o tipo de consulta"),
    doctorName: z.string().min(1, "Insira o nome do médico responsável"),
    consultDate: z.date({ 
        error: "Insira a data de consulta"
    }),
    // No seu schema Zod
    consultTime: z.string().min(1, "Insira o horário")
        .refine((val) => val !== "00:00", { message: "Defina um horário válido para o atendimento" }),
    description: z.string().min(1, "Insira uma descrição"),
})
type RegisterFormValues = z.infer<typeof formSchema> // tipagem inferida do esquema

export default function Register(){
    const { register, control, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            patientName: "",
            tutorName: "",
            doctorName: "",
            species: undefined,
            age: "",
            consultType: undefined,
            consultDate: undefined, 
            consultTime: "00:00",
            description: "",
        }
    })

    // função onSubmit de teste para verificar validação
    const onSubmit = (data: RegisterFormValues) => {
        console.log("Formulário válido:", data)
    }
    return (
        <div className="mx-4 md:mx-10 lg:mx-[194px] mt-[25px]">
            <p className="text-[48px] font-bold">Cadastro</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-[20px] flex flex-col">
                {/* Bloco 1 - nome do pet e do tutor */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className="flex-1 space-y-2 relative pb-1">
                        <Label htmlFor="patientName" className="text-base font-bold">Nome do Paciente</Label>
                        <Input 
                            id="patientName"
                            placeholder="Digite aqui..."
                            className="h-[50px] w-full border-black"
                            {...register("patientName")}
                        />
                        {errors.patientName && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.patientName.message}</p>}
                    </div>
                    <div className="flex-1 space-y-2 relative pb-1">
                        <Label htmlFor="tutorName" className="text-base font-bold">Nome do Tutor</Label>
                        <Input 
                            id="tutorName"
                            placeholder="Digite aqui..."
                            className="h-[50px] w-full border-black"
                            {...register("tutorName")}
                        />
                        {errors.tutorName && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.tutorName.message}</p>}
                    </div>
                </div>

                {/* Bloco 2 - Seletor da espécie */}
                <div className="w-full space-y-4 mt-[24px] relative pb-1">
                    <Label htmlFor="species" className="text-base font-bold">Qual é a espécie do paciente?</Label>
                    <Controller
                        name="species"
                        control={control}
                        render={({field}) => (
                            <div className="flex flex-wrap justify-center lg:justify-start gap-[60px] sm:gap-8 lg:gap-[60px]">
                                {Object.entries(speciesAssets).map(([key, image]) => {
                                    const species = Number(key)
                                    const isSelected = field.value === species;

                                    return(
                                        <div
                                            key={key}
                                            onClick={() => field.onChange(species)}
                                            className={cn("w-[120px] h-[120px] sm:w-28 sm:h-28 lg:w-32 lg:h-32 p-[10px] rounded-md transition-all hover:bg-gray-100", isSelected && "bg-gray-200")}
                                        >
                                            <img src={image.src} alt={key} className={`w-full h-full object-contain cursor-pointer ${(Number(key) === PetSpecies.PIG) && 'scale-x-[-1]'}`}/>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    />
                    {errors.species && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.species.message}</p>}
                </div>

                {/* Bloco 3 - Idade do paciente e tipo de consulta */}
                <div className="flex flex-col md:flex-row gap-6 w-full mt-[24px]">
                    <div className="flex-1 space-y-2 relative pb-1">
                        <Label htmlFor="age" className="text-base font-bold">Idade do paciente</Label>
                        <Input 
                            id="age"
                            placeholder="Digite aqui..."
                            className="h-[50px] w-full border-black"
                            {...register("age")}
                        />
                        {errors.age && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.age.message}</p>}
                    </div>
                    <div className="flex-1 space-y-2 relative pb-1">
                        <Label htmlFor="consultType" className="text-base font-bold">Tipo da consulta</Label>
                        <Controller 
                            name="consultType"
                            control={control}
                            render={({field}) => (
                                <Select
                                    onValueChange={(val) => field.onChange(Number(val))}
                                    value={field.value?.toString() || ""}
                                >
                                    <SelectTrigger className="h-[50px] w-full border-black">
                                        <SelectValue placeholder="Selecione aqui" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(ConsultTypeValues).map(([key, label]) => (
                                            <SelectItem key={key} value={key}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.consultType && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.consultType.message}</p>}
                    </div>
                </div>

                {/* Bloco 4 - médico, data e horário */}
                <div className="flex flex-col md:flex-row gap-6 w-full mt-[24px]">
                    <div className="w-full md:w-1/2 space-y-2 relative pb-1">
                        <Label htmlFor="doctorName" className="text-base font-bold">Médico Responsável</Label>
                        <Input 
                            id="doctorName"
                            placeholder="Digite aqui..."
                            className="h-[50px] w-full border-black"
                            {...register("doctorName")}
                        />
                        {errors.doctorName && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.doctorName.message}</p>}
                    </div>
                    <div className="w-full md:w-1/4 space-y-2 relative pb-1">
                        <Label htmlFor="consultDate" className="text-base font-bold">Data do atendimento</Label>
                        <Controller 
                            name="consultDate"
                            control={control}
                            render={({field}) => (
                                <div className="relative">
                                    <Input 
                                        id="consultDate"
                                        type="date"
                                        value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                                        onChange={(e) => { // conversão pra tipo Date
                                            const date = e.target.valueAsDate; 
                                            if(date) field.onChange(date);
                                        }}
                                        className="h-[50px] w-full border-black pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
                                    />

                                    {/* configuração do datepicker */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" >
                                                <img src={CalendarIcon.src} alt="calendarIcon" className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-white shadow-lg border rounded-md z-[9999]" align="end">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date < new Date("1900-01-01")}
                                                locale={ptBR}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )}
                        />
                        {errors.consultDate && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.consultDate.message}</p>}
                    </div>
                    <div className="w-full md:w-1/4 space-y-2 relative pb-1">
                        <Label htmlFor="consultTime" className="text-base font-bold">Horário do atendimento</Label>
                        <div className="relative">
                            <Input 
                                id="consultTime"
                                type="time"
                                defaultValue="00:00"
                                className="h-[50px] w-full border-black pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
                                {...register("consultTime")}
                            />
                            <img src={ClockIcon.src} alt="clock-icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                        </div>
                        {errors.consultTime && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.consultTime.message}</p>}
                    </div>
                </div>

                {/* Bloco 5 - descrição do problema */}
                <div className="flex flex-col md:flex-row gap-6 w-full mt-[24px]">
                    <div className="w-full space-y-2 relative pb-1">
                        <Label htmlFor="description" className="text-base font-bold">Descrição do problema</Label>
                        <Textarea 
                            id="description"
                            placeholder="Digite aqui..."
                            className="h-[104px] w-full border-black"
                            {...register("description")}
                        />
                        {errors.description && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.description.message}</p>}
                    </div>
                </div>
                <Button type="submit" className="w-[205px] h-[48px] mt-5 mb-5 self-end bg-[#50E678] rounded-[24px] text-[16px] hover:bg-[#50E678] lg:mt-[65px]">Finalizar Cadastro</Button>
            </form>
        </div>
    )
}