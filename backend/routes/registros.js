import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { readReviews, writeReviews } from '../services/storage.js'

const router = Router()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

function validateReview(body = {}) {
  const errors = []

  const pelicula = String(body.pelicula || '').trim()
  const nombre = String(body.nombre || '').trim()
  const email = String(body.email || '').trim()
  const descripcion = String(body.descripcion || '').trim()
  const fecha = String(body.fecha || '')
  const genero = String(body.genero || '').trim()

  const calificacion =
    body.calificacion === null ||
    body.calificacion === '' ||
    body.calificacion === undefined
      ? null
      : Number(body.calificacion)

  if (!pelicula) errors.push('La película es obligatoria.')
  if (!nombre) errors.push('El nombre es obligatorio.')
  if (!emailPattern.test(email)) errors.push('El correo no tiene un formato válido.')

  if (descripcion.length < 20) {
    errors.push('La descripción debe tener al menos 20 caracteres.')
  }

  if (descripcion.length > 600) {
    errors.push('La descripción no puede superar 600 caracteres.')
  }

  if (!fecha) {
    errors.push('La fecha es obligatoria.')
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    errors.push('La fecha debe usar el formato YYYY-MM-DD.')
  } else if (fecha > todayISO()) {
    errors.push('La fecha no puede estar en el futuro.')
  }

  if (!genero) errors.push('El género es obligatorio.')

  if (
    calificacion !== null &&
    (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5)
  ) {
    errors.push('La calificación debe estar entre 1 y 5.')
  }

  return {
    errors,
    value: {
      pelicula,
      nombre,
      email,
      descripcion,
      fecha,
      genero,
      calificacion,
    },
  }
}

router.get('/', async (_req, res, next) => {
  try {
    const reviews = await readReviews()

    const ordered = [...reviews].sort((a, b) =>
      String(b.createdAt).localeCompare(String(a.createdAt))
    )

    return res.status(200).json(ordered)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { errors, value } = validateReview(req.body)

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Datos inválidos.',
        details: errors,
      })
    }

    const reviews = await readReviews()

    const review = {
      id: randomUUID(),
      ...value,
      createdAt: new Date().toISOString(),
    }

    reviews.push(review)
    await writeReviews(reviews)

    return res.status(201).json(review)
  } catch (error) {
    next(error)
  }
})

export default router
