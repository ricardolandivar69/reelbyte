import express from 'express'
import cors from 'cors'
import registrosRouter from './routes/registros.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '100kb' }))

app.get('/', (_req, res) => {
  res.json({
    name: 'ReelByte API',
    status: 'ok',
    endpoints: ['GET /registros', 'POST /registros'],
  })
})

app.use('/registros', registrosRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' })
})

app.use((error, _req, res, _next) => {
  console.error('[API ERROR]', error)
  res.status(500).json({
    error: 'No se pudo procesar la solicitud en el servidor.',
  })
})

app.listen(PORT, () => {
  console.log(`ReelByte API disponible en http://localhost:${PORT}`)
})
