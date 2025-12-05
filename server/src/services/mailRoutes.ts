import { Router } from "express";
import { SendMail } from "./mailController";

const MailRouter = Router();

MailRouter.post('/', SendMail);

export default MailRouter;