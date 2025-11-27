import express from "express";
import userController from "./controllers/UserController";
import PatientController from "./controllers/PatientController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/patient", PatientController.create);
routes.get("/patient", PatientController.get);
routes.get("/patient/:id", PatientController.getOne);
routes.delete("/patient/:id", PatientController.delete);
routes.patch("/patient/:id", PatientController.update);

export default routes;
