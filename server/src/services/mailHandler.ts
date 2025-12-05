import nodemailer from "nodemailer";

async function MailHandler(emailConfig: {
    userName: string;
    userMail: string;
    subjectText: string;
    html: string;
}
) {
    try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })

    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: emailConfig.userMail,
        subject: emailConfig.subjectText,
        html: emailConfig.html
    })
    return true;

    } catch(error) {
        console.log(error)
        return false;
    }
}

export default MailHandler;