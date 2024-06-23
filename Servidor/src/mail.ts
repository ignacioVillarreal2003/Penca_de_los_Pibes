const admin = require('./database/admin');
const user = require('./database/user');
const { getChampionship } = require('./variables');

const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL, // Email password: Arbol12345678
    pass: process.env.MAILPASS // Codigo de verificacion(al verificar en dos pasos)
  }
});

export function createMailOptions(from: any, to: any, subject: any, text: any) {
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };
  return mailOptions;
}

export const pointsRemainder = async () => {    
    try {
        const matches: any[] = await admin.getMatchesAdmin(getChampionship());          
        const users: any[] = await user.getAllUsers(); 
        
        let text = `Recuerda puntuar a:\n`;
        matches.forEach((match: any) => {            
            if (isToday(match.dateMatch)){
                text += `${match.team1} vs ${match.team2}\n`
            }
        })
        users.forEach((user: any) => {
            if (user.mail){
                const mailOptions = createMailOptions(process.env.MAIL, user.mail, 'Penca UCU', text);
                transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Correo enviado: ' + info.response);
                }
                });
            }
        })
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

function isToday(date1: string) {
    const d1 = new Date(date1);
    const d2 = new Date();

    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}