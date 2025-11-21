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

export function ModalCadastro() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[95vh] max-w-[95vw] w-[423px] h-[408px] overflow-y-auto sm:rounded-xl rounded-3xl">
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
          <div className="w-full w-[312px] mx-auto mt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-md">E-mail</Label>
              <Input id="email" name="email-input" placeholder="Digite aqui..." className="border-black h-[50px]" />
            </div>
          </div>
          <DialogFooter className="flex flex-col items-center justify-center sm:justify-center mt-3 mb-4"> 
            <Button type="submit" className="w-full max-w-[312px] rounded-3xl bg-[#50E678] hover:bg-[#40b860]">Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
