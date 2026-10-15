import { access, readFile, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_FILE = path.join(__dirname, '..', 'data', 'registros.json')

async function ensureFile() {
  try {
    await access(DATA_FILE, constants.F_OK)
  } catch {
    await writeFile(DATA_FILE, '[]\n', 'utf8')
  }
}

export async function readReviews() {
  await ensureFile()

  const content = await readFile(DATA_FILE, 'utf8')

  let parsed

  try {
    parsed = JSON.parse(content || '[]')
  } catch {
    throw new Error('El archivo registros.json contiene un JSON no válido.')
  }

  if (!Array.isArray(parsed)) {
    throw new Error('El archivo de registros no contiene una lista válida.')
  }

  return parsed
}

export async function writeReviews(reviews) {
  await ensureFile()

  if (!Array.isArray(reviews)) {
    throw new Error('Solo se puede guardar una lista de registros.')
  }

  await writeFile(
    DATA_FILE,
    `${JSON.stringify(reviews, null, 2)}\n`,
    'utf8',
  )
}
