import express from 'express'
import cors from 'cors'
import http from 'node:http'
import registrosRouter from './routes/registros.js'

const app = express()
const PORT = 8787
const HOST = '127.0.0.1'

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.status(200).json({
    name: 'ReelByte API',
    status: 'ok',
    endpoints: ['GET /registros', 'POST /registros'],
  })
})

app.use('/registros', registrosRouter)

app.use((error, _req, res, _next) => {
  console.error('[API ERROR]', error)

  res.status(500).json({
    error: 'Error interno del servidor.',
  })
})

const server = http.createServer(app)

server.listen(PORT, HOST, () => {
  console.log(`ReelByte API disponible en http://${HOST}:${PORT}`)
})

server.on('error', (error) => {
  console.error('[SERVER ERROR]', error)
})

server.on('close', () => {
  console.log('[SERVER] El servidor fue cerrado.')
})

// Mantiene el proceso activo en caso de que el entorno libere el handle HTTP.
server.ref()
process.stdin.resume()