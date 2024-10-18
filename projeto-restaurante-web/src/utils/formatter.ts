export const formatarData = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
  hour12: false,
});

export const formatarHora = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export function converterHora(horaString: string) {
  const [hora, minuto] = horaString.split(':').map(Number);
  const dataAtual = new Date();
  dataAtual.setHours(hora, minuto, 0, 0);
  return dataAtual;
}
