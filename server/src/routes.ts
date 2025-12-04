import express from "express";
import userController from "./controllers/UserController";
import PatientController from "./controllers/PatientController";
import AppointmentController from "./controllers/AppointmentController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.get("/patient/search/getIdByName", PatientController.getIdByName);
routes.get("/patient/search", PatientController.search);
routes.post("/patient", PatientController.create);
routes.get("/patient", PatientController.get);
routes.get("/patient/:id", PatientController.getOne);
routes.delete("/patient/:id", PatientController.delete);
routes.patch("/patient/:id", PatientController.update);

// Rotas da consulta
routes.get("/consultas", AppointmentController.getAll); // Lista as consultas
routes.get("/consultas/:id", AppointmentController.getById); // Busca a consulta por id
routes.post("/consultas", AppointmentController.create); // Cria uma nova consulta
routes.put("/consultas/:id", AppointmentController.update); // Atualiza uma consulta existente
routes.delete("/consultas/:id", AppointmentController.delete); // Deleta uma consulta

export default routes;
