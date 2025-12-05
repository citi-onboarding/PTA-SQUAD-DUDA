import { View, Text, ScrollView } from "react-native";
import { CITiPet } from "@assets";
import ThemeField from "../src/components/ThemeField";
import CardPet from "../src/components/CardPet";

const App: React.FC = () => {
  

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
          <CardPet 
            dataHora="2025-05-26T14:30:00.000Z"
            nomePet="Mumu"
            nomeTutor="Clair"
            nomeVeterinario="Dr. Cicrano"
            tipoConsulta="FIRST"
            especiePet="DOG"
            realizado={false}
          />
          <CardPet 
            dataHora="2025-08-06T19:00:00.000Z"
            nomePet="Garfield"
            nomeTutor="George"
            nomeVeterinario="Dr. Fulano"
            tipoConsulta="CHECKUP"
            especiePet="CAT"
            realizado={false}
          />
          <CardPet 
            dataHora="2025-12-11T10:20:00.000Z"
            nomePet="Waddles"
            nomeTutor="Mabel"
            nomeVeterinario="Dr. Beltrano"
            tipoConsulta="RETURN"
            especiePet="PIG"
            realizado={false}
          />
        </ScrollView>

        <View className="w-full h-[75px] bg-[#50E678] rounded-t-[24px] bottom-0"></View>
      </View>
    </View>
  )
};

export default App;
