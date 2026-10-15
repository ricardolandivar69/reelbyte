import PosterTile from './PosterTile.jsx'

function formatDate(value) {
  if (!value) return 'Sin fecha'
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <PosterTile title={review.pelicula} genre={review.genero} compact />

      <div className="review-content">
        <div className="review-heading">
          <div>
            <p className="eyebrow">{review.genero}</p>
            <h2>{review.pelicula}</h2>
          </div>
          {review.calificacion ? (
            <span className="rating" aria-label={`${review.calificacion} de 5 estrellas`}>
              {'★'.repeat(review.calificacion)}<span>{'★'.repeat(5 - review.calificacion)}</span>
            </span>
          ) : (
            <span className="rating-empty">Sin puntuación</span>
          )}
        </div>

        <p className="review-copy">{review.descripcion}</p>

        <div className="review-meta">
          <span>Por <strong>{review.nombre}</strong></span>
          <span>{formatDate(review.fecha)}</span>
          <span className="review-id">#{review.id.slice(0, 8)}</span>
        </div>
      </div>
    </article>
  )
}
