// diretório "repositories" também é conhecido por "database"
// aplicação do SOLID -> descreve o "contrato" da aplicação, mas não o implementa
export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>; // por ser uma função async lá em prisma-feedbacks-repository, não retorna somente void, mas uma Promise<void>
}
