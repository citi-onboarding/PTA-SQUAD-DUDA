"use client"
import {useForm, Controller} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import {format} from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"

import { CalendarIcon, ClockIcon, TopBarLogo, xCloseIcon } from "@/assets"

// imports shadcn
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogClose, DialogContent, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import { DialogTitle } from "@radix-ui/react-dialog"

enum ConsultType{
	PRIMEIRA_CONSULTA,
	RETORNO,
	CHECKUP,
	VACINACAO
}
// mapeamento dos valores de tipos de consulta
const ConsultTypeValues: Record<ConsultType, string> = {
    [ConsultType.PRIMEIRA_CONSULTA]: "Primeira consulta",
    [ConsultType.RETORNO]: "Retorno",
    [ConsultType.CHECKUP]: "Check-up",
    [ConsultType.VACINACAO]: "Vacinação",
}

// esquema de configuração de validação do Zod
const consultFormSchema = z.object({
    patientName: z.string().optional(),
    consultType: z.custom<number>((val) => typeof val === 'number', "Selecione o tipo de consulta"),
    doctorName: z.string().min(1, "Insira o nome do médico responsável"),
    consultDate: z.date({ 
        error: "Insira a data de consulta"
    }),
    consultTime: z.string().min(1, "Insira o horário")
        .refine((val) => val !== "00:00", { message: "Defina um horário válido para o atendimento" }),
})
// extende para caso venha da tela de atendimento
const reformedSchema = consultFormSchema.extend({
    patientName: z.string().min(1, "Insira o nome do paciente"),
})

type ConsultFormValues = z.infer<typeof consultFormSchema> // tipagem inferida do esquema

interface ModalPetConsultProps{
    isOpen: boolean,
    setIsopen: (open: boolean) => void,
    patientId: number,
    isAttendingPage?: boolean
}

export default function ModalPetConsult({isOpen, setIsopen, patientId, isAttendingPage=false}:ModalPetConsultProps){
    const {register, control, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(isAttendingPage ? reformedSchema : consultFormSchema),
        defaultValues: {
            patientName: "",
            doctorName: "",
            consultType: undefined,
            consultDate: undefined, 
            consultTime: "00:00"
        }
    })

    // função onSubmit de teste para verificar validação
    const onSubmit = async (data: ConsultFormValues) => {
        try{
            const consult = {
                patientName: data.patientName,
                doctorName: data.doctorName,
                consultType: data.consultType,
                consultDate: data.consultDate,
                consultTime: data.consultTime
            };
            console.log(consult);
            
        } catch(error:any){
            console.error('Erro ao cadastrar as informações: ', error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsopen}>
            <DialogContent className="sm:max-w-[824px] !sm:max-h-[493px] w-full px-[48px] py-[48px] bg-white !rounded-[24px] border-none [&>button]:hidden" aria-describedby={undefined}>
                {/* Botão de fechar o popup */}
                <div className="absolute right-[48px] top-[48px] z-50">
                    <DialogClose className="w-[24px] h-[24px]">
                        <Image src={xCloseIcon} alt="close button" className="object-contain"/>
                    </DialogClose>
                </div>
                <DialogHeader className="flex flex-col items-center justify-center space-y-4 relative">
                    <Image src={TopBarLogo} alt="Logo CITi Pet" className="w-[189px] h-auto"/>
                    <DialogTitle className="text-[16px] !mt-[29px] flex flex-row gap-1">
                        <p className="font-bold">O pet já está cadastrado no sistema!</p>
                        <p>Preencha os dados da</p>
                        <p className="font-bold">consulta</p>
                    </DialogTitle>
                </DialogHeader>

                {/* Formulário do popup */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-[13px]">
                    {/* Bloco extra - Nome do paciente */}
                    {isAttendingPage && (
                        <div className="flex flex-col gap-[12px] mb-[12px] relative">
                            <Label htmlFor="patientName" className="text-base font-bold">Nome do paciente</Label>
                            <Input 
                                id="patientName"
                                placeholder="Digite aqui..."
                                className="h-[50px] w-full rounded-[8px] border-black"
                                {...register("patientName")}
                            />
                            {errors.patientName && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.patientName.message}</p>}
                        </div>
                    )}
                    {/* Bloco 1 - Tipo de consulta e médico */}
                    <div className="flex gap-[12px] mb-[12px]">
                        <div className="w-full md:w-1/2 space-y-2 relative">
                            <Label htmlFor="consultType" className="text-base font-bold">Tipo de consulta</Label>
                            <Controller 
                                name="consultType"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        onValueChange={(val) => field.onChange(Number(val))}
                                        value={field.value?.toString() || ""}
                                    >
                                        <SelectTrigger className="h-[50px] w-full rounded-[8px] border-black">
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
                        <div className="w-full md:w-1/2 space-y-2 relative">
                            <Label htmlFor="doctorName" className="text-base font-bold">Médico Responsável</Label>
                            <Input 
                                id="doctorName"
                                placeholder="Digite aqui..."
                                className="h-[50px] w-full rounded-[8px] border-black"
                                {...register("doctorName")}
                            />
                            {errors.doctorName && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.doctorName.message}</p>}
                        </div>
                    </div>

                    {/* Bloco 2 - data e horário */}
                    <div className="flex gap-[12px]">
                        <div className="w-full md:w-1/2 space-y-2 relative">
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
                                            className="h-[50px] w-full rounded-[8px] border-black pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
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
                        <div className="w-full md:w-1/2 space-y-2 relative">
                            <Label htmlFor="consultTime" className="text-base font-bold">Horário do atendimento</Label>
                            <div className="relative">
                                <Input 
                                    id="consultTime"
                                    type="time"
                                    defaultValue="00:00"
                                    className="h-[50px] w-full rounded-[8px] border-black pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
                                    {...register("consultTime")}
                                />
                                <img src={ClockIcon.src} alt="clock-icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                            </div>
                            {errors.consultTime && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.consultTime.message}</p>}
                        </div>
                    </div>
                    <Button type="submit" className="mt-[29px] rounded-[24px] bg-[#50E678] h-[42px] text-[16px] font-[500] hover:bg-[#50E678]">Finalizar Cadastro</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}