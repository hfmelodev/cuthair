import { PrismaClient } from '@prisma/client'

// Declarando globalmente uma variável para armazenar o PrismaClient, com o nome 'cachedPrisma'.
// Isso permite que o PrismaClient seja reutilizado em diferentes partes da aplicação, evitando múltiplas instâncias.
declare global {
  var cachedPrisma: PrismaClient
}

let database: PrismaClient // Variável que vai armazenar a instância do PrismaClient

if (process.env.NODE_ENV === 'production') {
  // No ambiente de produção, cria uma nova instância do PrismaClient a cada requisição.
  database = new PrismaClient()
} else {
  /**
   * No ambiente de desenvolvimento, evita criar múltiplas instâncias do PrismaClient,
   * já que o Node.js tende a reiniciar o servidor frequentemente, o que criaria novas instâncias.
   * Usando 'global.cachedPrisma' para manter uma instância única entre reinicializações.
   */
  if (!global.cachedPrisma) {
    // Se não existir uma instância já armazenada em 'global.cachedPrisma', cria uma nova.
    global.cachedPrisma = new PrismaClient()
  }

  // Atribui a instância já armazenada ou recém-criada à variável 'database'.
  database = global.cachedPrisma
}

// Exportando a instância do PrismaClient para ser utilizada em outras partes da aplicação.
export const prisma = database
