import { FaStar } from 'react-icons/fa';

interface AvaliacaoEstrelasProps {
  media: number;
}

export function AvaliacaoEstrelas({ media }: AvaliacaoEstrelasProps) {
  // Array de 5 posições
  const estrelas = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {estrelas.map((estrela) => (
        <FaStar
          key={estrela}
          size={20}
          // De acordo com a posição da estela se a posição for menor que a média vai ficar Amarelo se não cinza claro
          color={estrela <= media ? '#FFD700' : '#e4e5e9'}
        />
      ))}
    </div>
  );
}
