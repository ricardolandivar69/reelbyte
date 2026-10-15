import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Message from '../components/Message.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import { getReviews } from '../services/api.js'

export default function Lista() {
  const location = useLocation()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [genre, setGenre] = useState('Todos')

  const loadReviews = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getReviews()
      setReviews(data)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReviews()
  }, [])

  const genres = useMemo(() => {
    const unique = [...new Set(reviews.map((review) => review.genero))].sort()
    return ['Todos', ...unique]
  }, [reviews])

  const filteredReviews = genre === 'Todos'
    ? reviews
    : reviews.filter((review) => review.genero === genre)

  return (
    <section className="section-shell page-section list-page">
      <div className="list-toolbar">
        <div className="page-heading page-heading-inline">
          <p className="eyebrow">Explorar</p>
          <h1>Reseñas de la comunidad.</h1>
          <p>Los registros que ves aquí llegan mediante GET desde la API.</p>
        </div>
        <Link className="button button-primary" to="/registro">+ Nueva reseña</Link>
      </div>

      <Message type="success">{location.state?.message}</Message>
      <Message type="error">{error}</Message>

      {!loading && reviews.length > 0 && (
        <div className="filter-bar">
          <span>{reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}</span>
          <label htmlFor="genre-filter">
            Filtrar por género
            <select id="genre-filter" value={genre} onChange={(event) => setGenre(event.target.value)}>
              {genres.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
      )}

      {loading && (
        <div className="state-card loading-card" role="status">
          <span className="spinner" aria-hidden="true"></span>
          <h2>Cargando reseñas</h2>
          <p>Consultando GET /registros...</p>
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="state-card empty-card">
          <span className="state-icon">○</span>
          <h2>Todavía no hay reseñas.</h2>
          <p>El archivo JSON está listo. Publica la primera película para iniciar el diario.</p>
          <Link className="button button-primary" to="/registro">Publicar la primera</Link>
        </div>
      )}

      {!loading && error && (
        <div className="state-card error-card">
          <span className="state-icon">!</span>
          <h2>No pudimos consultar la API.</h2>
          <p>Comprueba que el backend esté ejecutándose en el puerto configurado.</p>
          <button className="button button-secondary" type="button" onClick={loadReviews}>Reintentar</button>
        </div>
      )}

      {!loading && !error && filteredReviews.length > 0 && (
        <div className="review-list">
          {filteredReviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      )}

      {!loading && !error && reviews.length > 0 && filteredReviews.length === 0 && (
        <div className="state-card empty-card">
          <h2>No hay reseñas de {genre}.</h2>
          <button className="button button-secondary" type="button" onClick={() => setGenre('Todos')}>Ver todas</button>
        </div>
      )}
    </section>
  )
}
