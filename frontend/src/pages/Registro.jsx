import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message.jsx'
import { createReview } from '../services/api.js'

const genres = [
  'Acción',
  'Animación',
  'Ciencia ficción',
  'Comedia',
  'Documental',
  'Drama',
  'Romance',
  'Terror',
  'Otro',
]

const initialForm = {
  pelicula: '',
  nombre: '',
  email: '',
  descripcion: '',
  fecha: '',
  genero: '',
  calificacion: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function validate(values) {
  const errors = {}

  if (!values.pelicula.trim()) errors.pelicula = 'Escribe el nombre de la película.'
  if (!values.nombre.trim()) errors.nombre = 'Escribe tu nombre.'
  if (!emailPattern.test(values.email.trim())) errors.email = 'Ingresa un correo válido.'
  if (!values.descripcion.trim()) errors.descripcion = 'Escribe tu reseña.'
  else if (values.descripcion.trim().length < 20) errors.descripcion = 'La reseña debe tener al menos 20 caracteres.'
  if (!values.fecha) errors.fecha = 'Selecciona la fecha en la que viste la película.'
  else if (values.fecha > getToday()) errors.fecha = 'La fecha no puede estar en el futuro.'
  if (!values.genero) errors.genero = 'Selecciona un género.'

  return errors
}

export default function Registro() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const errors = useMemo(() => validate(form), [form])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setServerError('')
  }

  const handleBlur = (event) => {
    setTouched((current) => ({ ...current, [event.target.name]: true }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const currentErrors = validate(form)
    const allTouched = Object.keys(form).reduce((result, key) => ({ ...result, [key]: true }), {})
    setTouched(allTouched)

    if (Object.keys(currentErrors).length > 0) return

    setSubmitting(true)
    setServerError('')

    try {
      const created = await createReview({
        ...form,
        calificacion: form.calificacion ? Number(form.calificacion) : null,
      })

      setForm(initialForm)
      navigate('/lista', {
        state: {
          message: `La reseña de “${created.pelicula}” se guardó correctamente.`,
        },
      })
    } catch (error) {
      setServerError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const fieldError = (name) => touched[name] && errors[name]

  return (
    <section className="section-shell page-section form-page">
      <div className="page-heading">
        <p className="eyebrow">Publicar reseña</p>
        <h1>¿Qué te dejó la película?</h1>
        <p>Completa los campos y enviaremos la reseña a la API de Express.</p>
      </div>

      <div className="form-layout">
        <aside className="form-aside">
          <span className="big-number">01</span>
          <h2>Tu entrada al diario.</h2>
          <p>
            El formulario está controlado mediante estado de React. Las validaciones del navegador se complementan
            con validaciones propias antes del POST y vuelven a comprobarse en el servidor.
          </p>
          <div className="aside-note">
            <strong>Flujo</strong>
            <span>React → fetch → Express → JSON</span>
          </div>
        </aside>

        <form className="review-form" onSubmit={handleSubmit} noValidate>
          <Message type="error">{serverError}</Message>

          <div className="field-grid two-columns">
            <div className={`field ${fieldError('pelicula') ? 'field-error' : ''}`}>
              <label htmlFor="pelicula">Película</label>
              <input
                id="pelicula"
                name="pelicula"
                value={form.pelicula}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej. Interstellar"
                maxLength="80"
                required
              />
              <small>{fieldError('pelicula') || 'Título de la película reseñada.'}</small>
            </div>

            <div className={`field ${fieldError('genero') ? 'field-error' : ''}`}>
              <label htmlFor="genero">Género</label>
              <select id="genero" name="genero" value={form.genero} onChange={handleChange} onBlur={handleBlur} required>
                <option value="">Selecciona una opción</option>
                {genres.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
              </select>
              <small>{fieldError('genero') || 'Categoría principal de la película.'}</small>
            </div>
          </div>

          <div className="field-grid two-columns">
            <div className={`field ${fieldError('nombre') ? 'field-error' : ''}`}>
              <label htmlFor="nombre">Autor de la reseña</label>
              <input
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tu nombre"
                maxLength="60"
                required
              />
              <small>{fieldError('nombre') || 'Nombre que aparecerá en la tarjeta.'}</small>
            </div>

            <div className={`field ${fieldError('email') ? 'field-error' : ''}`}>
              <label htmlFor="email">Correo</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="nombre@correo.com"
                required
              />
              <small>{fieldError('email') || 'Se valida el formato, no se muestra públicamente.'}</small>
            </div>
          </div>

          <div className="field-grid two-columns">
            <div className={`field ${fieldError('fecha') ? 'field-error' : ''}`}>
              <label htmlFor="fecha">Fecha en que la viste</label>
              <input
                id="fecha"
                type="date"
                name="fecha"
                value={form.fecha}
                max={getToday()}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <small>{fieldError('fecha') || 'No puede ser una fecha futura.'}</small>
            </div>

            <div className="field">
              <label htmlFor="calificacion">Calificación <span className="optional">(opcional)</span></label>
              <select id="calificacion" name="calificacion" value={form.calificacion} onChange={handleChange}>
                <option value="">Sin puntuación</option>
                <option value="1">★</option>
                <option value="2">★★</option>
                <option value="3">★★★</option>
                <option value="4">★★★★</option>
                <option value="5">★★★★★</option>
              </select>
              <small>Detalle visual inspirado en diarios cinematográficos.</small>
            </div>
          </div>

          <div className={`field ${fieldError('descripcion') ? 'field-error' : ''}`}>
            <label htmlFor="descripcion">Reseña</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="7"
              minLength="20"
              maxLength="600"
              placeholder="Escribe qué te gustó, qué no funcionó o qué sensación te dejó..."
              required
            />
            <small>{fieldError('descripcion') || 'Entre 20 y 600 caracteres.'}</small>
          </div>

          <div className="form-actions">
            <p>Al enviar, los datos se validan nuevamente en Express.</p>
            <button className="button button-primary" type="submit" disabled={submitting}>
              {submitting ? 'Guardando...' : 'Publicar reseña'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
