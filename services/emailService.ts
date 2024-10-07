import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.USER,
        pass: process.env.APP_USER
      }
    });
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const info = await this.transporter.sendMail({
      from: process.env.USER,
      to,
      subject,
      text,
      html
    });

    console.log('Mensagem enviada: %s', info.messageId);
    return info;
  }
}

export const emailService = new EmailService();