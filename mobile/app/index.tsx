import { View, Text, ScrollView } from "react-native";
import { CITiPet } from "@assets";
import ThemeField from "../src/components/ThemeField";
import CardPet from "../src/components/CardPet";
import api from "../src/services/api";
import { useEffect, useState } from "react";
import { parseISO, format, isValid } from 'date-fns';

type TipoConsulta = 'FIRST' | 'VACINATION' | 'RETURN' | 'CHECKUP';
type EspeciePet = 'SHEEP' | 'CAT'| 'PIG' | 'COW' | 'HORSE' | 'DOG';

type Consulta = {
  id: number
  dataHora: string 
  nomePet: string
  nomeTutor: string
  nomeVeterinario: string
  tipoConsulta: TipoConsulta
  especiePet: EspeciePet
}

const App: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([])
  
  async function getConsultas() {
    try {
      const [cRes, pRes] = await Promise.all([api.get('/consultas'), api.get('/patient')]);
      const rawConsultas = cRes.data?.values ?? cRes.data ?? [];
      const rawPacientes = Array.isArray(pRes.data) ? pRes.data : (pRes.data?.values ?? []);

      const patientsById: Record<number, any> = {};
      for (const p of rawPacientes) if (p && typeof p.id === 'number') patientsById[p.id] = p;

      const mapped = (Array.isArray(rawConsultas) ? rawConsultas : []).map((item: any) => {
        let dataHora = String(item.datetime ?? item.dataHora ?? '');
        try {
          const d = parseISO(item.datetime ?? item.dataHora ?? '');
          if (isValid(d)) dataHora = format(d, 'dd/MM HH:mm');
        } catch (error) {
          console.log(error);
        }

        const patient = patientsById[item.patientId];
        return {
          id: item.id,
          dataHora,
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

  return (
    <View className="flex-1 flex-col items-center bg-white w-full">
      <View className="my-10 items-center justify-center w-full">
        <CITiPet width={143} height={54} />
      </View>
      <View className="flex-1 w-full">
        <Text className="text-[24px] font-bold mb-3 pl-10">Sua  agenda</Text>
        <Text className="text-[14px] font-[400] pl-9">Veja aqui todos os seus pacientes agendados para hoje.</Text>
        
        <ThemeField />
        
        <ScrollView contentContainerClassName="flex flex-col gap-4 items-center pb-[50px]" >
          {consultas.map(card => (
            <View key={card.id} className="w-[85%]">
              <CardPet 
                dataHora={card.dataHora}
                nomePet={card.nomePet}
                nomeTutor={card.nomeTutor}
                nomeVeterinario={card.nomeVeterinario}
                tipoConsulta={card.tipoConsulta}
                especiePet={card.especiePet}
              />
            </View>
          ))}
        </ScrollView>

        <View className="w-full h-[75px] bg-[#50E678] rounded-t-[24px] bottom-0"></View>
      </View>
    </View>
  )
};

export default App;
