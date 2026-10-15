import { Link } from 'react-router-dom'
import PosterTile from '../components/PosterTile.jsx'

const samplePosters = [
  { title: 'Horizonte', genre: 'Ciencia ficción' },
  { title: 'Medianoche', genre: 'Terror' },
  { title: 'Ritmo', genre: 'Drama' },
  { title: 'Domingo', genre: 'Comedia' },
]

export default function Home() {
  return (
    <>
      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">Un diario de cine hecho con React + Node.js</p>
          <h1>Guarda lo que viste.<br />Comparte lo que <span>te dejó.</span></h1>
          <p className="hero-description">
            ReelByte reúne reseñas de películas en una experiencia visual inspirada en diarios cinematográficos,
            construida de extremo a extremo con React, Express y persistencia JSON.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/registro">Publicar una reseña</Link>
            <Link className="button button-secondary" to="/lista">Explorar reseñas</Link>
          </div>
          <div className="hero-pills" aria-label="Tecnologías del proyecto">
            <span>React</span><span>Express</span><span>API REST</span><span>JSON</span>
          </div>
        </div>

        <div className="poster-stack" aria-label="Muestra visual de géneros cinematográficos">
          {samplePosters.map((item, index) => (
            <div className={`poster-wrap poster-wrap-${index + 1}`} key={item.title}>
              <PosterTile {...item} />
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell feature-section">
        <div className="section-heading">
          <p className="eyebrow">Cómo funciona</p>
          <h2>De tu formulario al archivo JSON.</h2>
          <p>Cada reseña recorre un flujo completo de frontend, API y almacenamiento persistente.</p>
        </div>

        <div className="flow-grid">
          <article className="flow-card">
            <span>01</span>
            <h3>Escribe</h3>
            <p>React controla los campos, valida la entrada y prepara los datos.</p>
          </article>
          <article className="flow-card">
            <span>02</span>
            <h3>Envía</h3>
            <p>Fetch realiza un POST hacia la API REST construida con Express.</p>
          </article>
          <article className="flow-card">
            <span>03</span>
            <h3>Persiste</h3>
            <p>El backend valida, genera un ID y conserva el registro dentro de JSON.</p>
          </article>
          <article className="flow-card">
            <span>04</span>
            <h3>Explora</h3>
            <p>React consulta la API con GET y convierte cada registro en una tarjeta.</p>
          </article>
        </div>
      </section>

      <section className="section-shell home-cta">
        <div>
          <p className="eyebrow">Tu próxima película merece una nota</p>
          <h2>Convierte una opinión en un registro persistente.</h2>
        </div>
        <Link className="button button-primary" to="/registro">Empezar ahora</Link>
      </section>
    </>
  )
}
