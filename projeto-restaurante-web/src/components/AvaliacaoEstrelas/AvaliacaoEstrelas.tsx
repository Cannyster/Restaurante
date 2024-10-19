import { FaStar } from 'react-icons/fa';

interface AvaliacaoEstrelasProps {
  media: number;
}

export function AvaliacaoEstrelas({ media }: AvaliacaoEstrelasProps) {
  const estrelas = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {estrelas.map((estrela) => (
        <FaStar
          key={estrela}
          size={20}
          color={estrela <= media ? '#f9a825' : '#e4e5e9'}
        />
      ))}
    </div>
  );
}
