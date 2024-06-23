const admin = require('../database/admin');
const user = require('../database/user');
const { getChampionship } = require('variables');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL, // Email
    pass: process.env.PASS // Codigo de verificacion(al verificar en dos pasos)
  }
});
// Contra mail: HOLAmundo1

function createMailOptions(from: any, to: any, subject: any, text: any) {
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };
  return mailOptions;
}

export const todosLosDias = async () => {
    try {
        const matches: any[] = await admin.getMatchesAdmin(getChampionship());  
        const users: any[] = await user.getAllUsers(); 
        let text = `Recuerda puntuar a:\n`;
        matches.forEach((match: any) => {
            if (match.dateMatch == new Date()){
                text += `${match.team1} vs ${match.team2}\n`
            }
        })
        users.forEach((user: any) => {
            // enviar mail
            // user.mail
        })
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}