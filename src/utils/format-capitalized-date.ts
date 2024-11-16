import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Função para capitalizar a primeira letra de uma palavra
function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Função para formatar e capitalizar corretamente a data
export function formatCapitalizedDate(date: Date): string {
  const formattedDate = format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })

  return formattedDate
    .split(' ')
    .map((word) => (word === 'de' ? word : capitalize(word)))
    .join(' ')
}
