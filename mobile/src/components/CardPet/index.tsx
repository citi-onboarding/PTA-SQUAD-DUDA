import { View, Text, Image } from 'react-native';
import Card from "../ui/Card";
import { CatPic, DogPic, SheepPic, CowPic, HorsePic, PigPic, Alarm } from '@assets';
import {format, parseISO} from 'date-fns'

type CardConsultaPetProps = {
  dataHora: string;
  nomePet: string;
  nomeTutor: string
  nomeVeterinario: string;
  tipoConsulta: 'FIRST' | 'VACINATION' | 'RETURN' | 'CHECKUP'
  especiePet: 'SHEEP' | 'CAT'| 'PIG' | 'COW' | 'HORSE' | 'DOG'
  realizado?: boolean;
  onClick?: () => void;
};

const tipoConsultaColorMap: Record<CardConsultaPetProps['tipoConsulta'], string> = {
  'FIRST': 'bg-[#BFB5FF]',
  'RETURN': 'bg-[#ffa275]',
  'CHECKUP': 'bg-[#9CFF95]' ,
  'VACINATION': 'bg-[#AAE1FF]',

};

const tipoConsultaLabelMap: Record<CardConsultaPetProps['tipoConsulta'], string> = {
  'FIRST': 'Primeira Consulta',
  'RETURN': 'Retorno',
  'CHECKUP': 'Check-up',
  'VACINATION': 'Vacinação',
};

// Mapa que associa a string da espécie ao objeto de imagem importado
const especieImageMap: Record<string, any> = {
  CAT: CatPic,
  DOG: DogPic,
  SHEEP: SheepPic,
  COW: CowPic,
  PIG: PigPic,
  HORSE: HorsePic,
};

export default function CardPet({dataHora, nomePet, nomeTutor, nomeVeterinario, tipoConsulta, especiePet, realizado}: CardConsultaPetProps) {

  const cardColorClass = realizado ? 'bg-gray-300' : tipoConsultaColorMap[tipoConsulta];
  const imagemPet = especieImageMap[especiePet] || CatPic; 

  // extrai data e hora
  const [data, horario] = dataHora.split(' ');

  return(
    <Card className={`flex flex-row justify-between items-center rounded-2xl gap-2 max-w-xl w-full h-[120px] p-6 border-[0px] hover:bg-opacity-60 ${cardColorClass}`}>
        <View className='flex flex-col items-center justify-center gap-2 p-1 py-3 rounded-md font-bold text-sm bg-white/80'>
          <Alarm width={20} height={20} />
          <Text className='text-[14px] font-bold'>{data}</Text>
          <Text className='text-[14px] font-bold'>{horario}</Text>
        </View>
        <View className='flex flex-col items-left gap-3 w-[100px] text-[14px]'>
            <View className='flex flex-row gap-1 text-sm items-center'>
                <Text className='font-bold'>{nomePet}</Text>
                <Text>/</Text>
                <Text>{nomeTutor}</Text>
            </View>
            <Text>
                {nomeVeterinario}
            </Text>
        </View>

        <View className='flex flex-col gap-2 items-center w-[110px]'>
          <Image source={imagemPet} style={{width: 57, height:57}} />
          <Text className='flex bg-white/80 p-1 px-1 justify-center text-[12px] rounded-md w-full text-center'>
            {tipoConsultaLabelMap[tipoConsulta]}
          </Text>
        </View>
    </Card>
  )
}