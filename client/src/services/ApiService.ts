import api from "@/services/api";

interface PatientData{
    id: number,
    name: string;
    tutorName: string,
    age: number,
    species: string
};

export async function managePatient(data: Omit<PatientData, 'id'>){
    const {name, tutorName, age, species} = data;

    try{
        const response = await api.get<PatientData[]>('/patient/search', {
            params: {
                name,
                tutorName,
                species,
            }
        });
        if (response.data.length > 0){ // caso encontre o paciente em questão
            return response.data[0].id; // retorna o id
        }
    } catch (error:any){
        console.log("Paciente não encontrado. Cadastro será realizado");
    }

    // se não encontrou, então adiciona o paciente no BD
    try{
        const patientData: Omit<PatientData, 'id'> = {name, tutorName, age, species}
        const response = await api.post('/patient', patientData);
        
        // busca o paciente criado para coletar o id
        const patientResponse = await api.get<PatientData[]>('/patient/search', {
            params: {
                name,
                tutorName,
                species,
            }
        });
        if (patientResponse.data.length > 0){
            return patientResponse.data[0].id; // retorna o id
        }
    } catch (error:any){
        console.error("Erro ao criar paciente: ", error);
        throw error;
    }
}
