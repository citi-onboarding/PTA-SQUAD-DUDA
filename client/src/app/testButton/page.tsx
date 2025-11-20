"use client";
import { BotaoAcao } from "../../components/ui/Buttons/index"
import { CirclePlus } from 'lucide-react';

export default function TestButton() {
    const funcaoTeste = () => alert("ola");
    return(
        <div className="flex flex-1 flex-col h-full justify-around items-center bg-gray-900">
            <BotaoAcao
            onClick={funcaoTeste}
            texto="Nova Consulta"
            cor="bg-verde hover:bg-verdeHover"
            icon={<CirclePlus size={24} />} //nao estou conseguindo mudar o tamanho do icone
            />
            <BotaoAcao
            onClick={funcaoTeste}
            texto="Buscar"
            cor="bg-roxo hover:bg-roxoHover"
            />
        </div>
    )
}