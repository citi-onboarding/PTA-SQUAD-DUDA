import { Request, Response } from "express";
import { request } from "http";
import { Crud, Citi } from "src/global";

class PatientController implements Crud {

    constructor(private readonly citi = new Citi("Patient")) {}

    create = async (request: Request, response: Response) => {
        const { name, tutorName, age, species } = request.body;

        const isAnyUndefined = this.citi.areValuesUndefined(
            name, tutorName, age, species
        );

        if (isAnyUndefined) return response.status(400).send();

        const newPatient = { name, tutorName, age, species };
        const { httpStatus, message } = await this.citi.insertIntoDatabase(newPatient);

        return response.status(httpStatus).send({message});
    }

    get = async (request: Request, response: Response) => {
        const { httpStatus, values } = await this.citi.getAll();

        return response.status(httpStatus).send(values);
    }

    getOne = async (request: Request, response: Response) => {
        const { id } = request.params;
        
        const { httpStatus, value } = await this.citi.findById(id);
        
        if (!value) {
            return response.status(404).send({ error: "Paciente não cadastrado." });
        }

        return response.status(httpStatus).send({value});
    }

    delete = async (request: Request, response: Response) => {
        const { id } = request.params;
        const { httpStatus, messageFromDelete} = await this.citi.deleteValue(id);

        return response.status(httpStatus).send({messageFromDelete});
    }

    update = async(request: Request, response: Response) => {
        const { id } = request.params;
        const { name, tutorName, age, species } = request.body;

        const updatedValues = { name, tutorName, age, species };
        const { httpStatus, messageFromUpdate } = await this.citi.updateValue(id, updatedValues);

        return response.status(httpStatus).send({messageFromUpdate});
    }
}

export default new PatientController();