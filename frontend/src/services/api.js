const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Ocurrió un error al comunicarse con la API.')
  }

  return data
}

export async function getReviews() {
  const response = await fetch(`${API_URL}/registros`)
  return parseResponse(response)
}

export async function createReview(review) {
  const response = await fetch(`${API_URL}/registros`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  })

  return parseResponse(response)
}

export { API_URL }
