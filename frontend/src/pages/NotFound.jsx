import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section-shell state-page">
      <div className="state-card">
        <span className="state-icon">404</span>
        <h1>Esta escena no existe.</h1>
        <p>La ruta que intentaste abrir no forma parte de ReelByte.</p>
        <Link className="button button-primary" to="/">Volver al inicio</Link>
      </div>
    </section>
  )
}
