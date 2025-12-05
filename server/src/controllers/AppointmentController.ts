import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class AppointmentController implements Crud {
    constructor(private readonly citi = new Citi("Consultation")) {}
    create = async(request:Request, response:Response) => {
        const { tipo, medico, data, descricao, pacienteId } = request.body;

        const isAnyUndefined = this.citi.areValuesUndefined(
            tipo,
            medico,
            data,
            descricao, 
            pacienteId
        );
        if(isAnyUndefined) return response.status(400).send();

        const newAppointment = { // dados sendo armazenados de acordo com o nome do modelo do bd
            type: tipo,
            doctorName: medico,
            datetime: data,
            description: descricao,
            patientId: Number(pacienteId)
        };
        const {httpStatus, message} = await this.citi.insertIntoDatabase(newAppointment);

        return response.status(httpStatus).send({message});
    };

    getAll = async(request:Request, response:Response) => {
        const {httpStatus, values} = await this.citi.getAll();

        return response.status(httpStatus).send({values});
    };

    getById = async(request:Request, response:Response) => {
        const {id} = request.params;
        const {httpStatus, value} = await this.citi.findById(id);

        return response.status(httpStatus).send({value});
    };

    delete = async(request:Request, response:Response) => {
        const {id} = request.params;
        const {httpStatus, messageFromDelete} = await this.citi.deleteValue(id);

        return response.status(httpStatus).send({messageFromDelete});
    };

    update = async(request:Request, response:Response) => {
        const {id} = request.params;
        const {object} = request.body;
        
        const {httpStatus, messageFromUpdate} = await this.citi.updateValue(id, object);

        return response.status(httpStatus).send({messageFromUpdate});
    };

    getByPatientId = async(request:Request, response:Response) => {
        const { patientId } = request.params;
        
        const {httpStatus, values} = await this.citi.getAll();

        const filteredValues = values.filter((appointment) => appointment.patientId === Number(patientId));

        return response.status(httpStatus).send({ values: filteredValues });
    };
}

export default new AppointmentController();