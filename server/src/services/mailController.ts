import { MailHandler } from 'src/services'
import { Request, Response } from 'express'
import { mailTemplate } from './mailTamplate'


export async function SendMail(req: Request, res: Response){
    try{
        const { userName, userMail, subjectText } = req.body
        const emailConfig = {
            userName,
            userMail,
            subjectText,
            html: mailTemplate(userName)
        };
        const mailResponse = await MailHandler(emailConfig);
        if (mailResponse) {
            res.status(200).json({ message: 'E-mail enviado com sucesso!' });
        } else {
            res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
        }
    } catch(error){
        console.log(error)
        res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
    }
}