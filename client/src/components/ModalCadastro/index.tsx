'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TopBarLogo } from "@/assets";
import Image from "next/image";
import {useForm, Controller} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import api from "@/services/api";


const modalCadastroSchema = z.object({
    email: z.string().min(1, "Insira o email do tutor"),
})
type ModalCadastroValues = z.infer<typeof modalCadastroSchema> // tipagem inferida do esquema

interface ModalCadastroProps {
  isOpen: boolean,
  setIsopen: (open: boolean) => void
}

export function ModalCadastro({isOpen, setIsopen}:ModalCadastroProps) {

  const {register, control, handleSubmit, formState: {errors}} = useForm({
          resolver: zodResolver(modalCadastroSchema),
          defaultValues: {
              email: ""
          }
      })


    const handleSendEmail = async (data: ModalCadastroValues) => {
      try {
        const emailPayload = {
          userMail: data.email,
          userName: "Tutor",
          subjectText: "Comprovante de Cadastro - Clínica Veterinária"
        };

        await api.post('/mail', emailPayload);

        alert('E-mail de comprovação enviado com sucesso!');
        setIsopen(false); // Fecha o modal após o envio
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        alert('Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente.');
      }
    };


  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
        <DialogContent className="max-h-[95vh] max-w-[95vw] w-[423px] h-[408px] overflow-y-auto sm:rounded-xl rounded-3xl">
          <form onSubmit={handleSubmit(handleSendEmail)}>
          <DialogHeader>
            <div className="flex justify-center mt-[18px]"> 
                <Image src={TopBarLogo} alt="Logo Citi" className="" />
            </div>
            <DialogDescription>
                <div className="flex flex-col text-center mt-4">
                    <p className="text-lg text-black">
                        <span className="font-bold">Cadastro finalizado!</span> Envie o <br />
                        comprovante para o <span className="font-bold">tutor</span>
                    </p>
                </div>
            </DialogDescription>
          </DialogHeader>
          <div className="w-full mx-auto mt-2 mb-[29px]">
            <div className="relative flex flex-col gap-2 mr-[48px] ml-[48px]">
              <Label htmlFor="email" className="text-md">E-mail</Label>
              <Input id="email" placeholder="Digite aqui..." className="border-black h-[50px]" {...register("email")}/>
              {errors.email && <p className="absolute -bottom-4 left-0 text-red-500 text-xs">{errors.email.message}</p>}
            </div>
          </div>
          <DialogFooter className="flex flex-col items-center justify-center sm:justify-center mt-3 mb-4 mr-[48px] ml-[48px]"> 
            <Button type="submit" className="w-full max-w-[312px] rounded-3xl bg-[#50E678] hover:bg-[#40b860]">Enviar</Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}
