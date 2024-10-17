import { useState } from "react";
import { Link } from "react-router-dom";
import { AvalicaoModal } from "../../components/AvaliacaoModal/AvaliacaoModal";
import { Content, ReviewButton, ReviewsContainer } from "./styled";

export function RestauranteDetalhes({ restaurante }) {
  const [reviews, setReviews] = useState(restaurante.avaliacoes || []);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleAddReview = () => {
    setSelectedReview(null);
    setIsModalOpen(true);
  };

  return (
    <Content>
      <h1>{restaurante.nome}</h1>
      <p>{restaurante.localizacao}</p>
      <p>{restaurante.cozinha}</p>

      <ReviewButton onClick={handleAddReview}>Adicionar Avaliação</ReviewButton>

      <ReviewsContainer>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>{review.comentario}</p>
            <button onClick={() => handleEditReview(review)}>
              Editar Avaliação
            </button>
          </div>
        ))}
      </ReviewsContainer>

      {isModalOpen && (
        <AvalicaoModal
          review={selectedReview}
          restauranteId={restaurante.id}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      <Link to="/">Voltar para Restaurantes</Link>
    </Content>
  );
}
