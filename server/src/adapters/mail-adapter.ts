// diretório "adapters" é utilizado para serviços externos da aplicação
export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}
