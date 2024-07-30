import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";
import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';

const prisma = new PrismaClient();

interface Calendario {
  dataAgendamento: number;
  idLocal: string;
}

class CreateReservaCalendarioUseCase {
  async execute({
    dataAgendamento,
    idLocal
  }: Calendario) {
    try {
      const transaction = await prisma.$transaction(async (prisma) => {

        const local = await prisma.local.findFirst({
          where:{id: idLocal}
        })

        if(dataAgendamento.toString() == local.calendario_id){
          new Error ("Esse horário já está agendado!")
        }

        if(dataAgendamento !== null){
          await prisma.calendario.create({
            data:{
              dataAgendamento: dataAgendamento,
              local: {
                connect:{
                  id: idLocal
                }
              }
            }
          })
        }

        await this.sendEmail({
            to: 'destinatario@example.com',
            subject: 'Confirmação de Agendamento',
            text: `Seu agendamento para ${new Date(dataAgendamento).toLocaleString()} foi confirmado.`,
            html: `<p>Seu agendamento para <strong>${new Date(dataAgendamento).toLocaleString()}</strong> foi confirmado.</p>`
          });
      
      });
      return transaction
    } catch (error) {
      logger.error(error);
      return 422;
    } finally {
      await prisma.$disconnect();
    }
  }

  private async sendEmail({ to, subject, text, html }: { to: string; subject: string; text: string; html: string; }): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail enviado: ' + info.response);
    } catch (error) {
      console.error('Erro ao enviar e-mail: ', error);
    }
  }
}



export { CreateReservaCalendarioUseCase };
