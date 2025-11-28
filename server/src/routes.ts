import express from "express";
import userController from "./controllers/UserController";
import AppointmentController from "./controllers/AppointmentController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

// Rotas da consulta
routes.get("/consultas", AppointmentController.getAll); // Lista as consultas
routes.get("/consultas/:id", AppointmentController.getById); // Busca a consulta por id
routes.post("/consultas", AppointmentController.create); // Cria uma nova consulta
routes.put("/consultas/:id", AppointmentController.update); // Atualiza uma consulta existente
routes.delete("/consultas/:id", AppointmentController.delete); // Deleta uma consulta

export default routes;
