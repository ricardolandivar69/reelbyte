# ReelByte

ReelByte es una aplicación web para registrar y consultar reseñas de películas. El proyecto fue desarrollado como componente práctico de Desarrollo Web utilizando React en el frontend, Node.js con Express en el backend y un archivo JSON como almacenamiento persistente.

## Integrantes

- Ricardo Landívar
- Miguel Peñafiel
- Jackson Reyes
- Mariana Reyes

## Tecnologías

### Frontend
- React
- Vite
- React Router
- Fetch API
- CSS responsive

### Backend
- Node.js
- Express
- CORS
- API REST
- Persistencia mediante JSON

## Estructura del proyecto

```text
reelbyte/
├── backend/
│   ├── data/
│   │   └── registros.json
│   ├── routes/
│   │   └── registros.js
│   ├── services/
│   │   └── storage.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── docs/
├── .gitignore
└── README.md
```

## Requisitos

- Node.js instalado
- npm instalado
- Dos terminales disponibles: una para backend y otra para frontend

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/ricardolandivar69/reelbyte.git
cd reelbyte
```

### Backend

```bash
cd backend
npm install
node server.js
```

La API queda disponible en:

```text
http://127.0.0.1:3001
```

### Frontend

En una segunda terminal, desde la raíz del repositorio:

```bash
cd frontend
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente:

```text
http://localhost:5173
```

## Rutas del frontend

- `/` — página de inicio
- `/registro` — formulario para publicar una reseña
- `/lista` — consulta de reseñas registradas

## API REST

Base URL:

```text
http://127.0.0.1:3001
```

### GET /registros

Obtiene todas las reseñas almacenadas.

```http
GET /registros
```

Respuesta esperada:

```json
[
  {
    "id": "identificador-unico",
    "pelicula": "Interstellar",
    "nombre": "Ricardo Landívar",
    "email": "ricardo@example.com",
    "descripcion": "Una reseña de ejemplo con suficiente contenido.",
    "fecha": "2026-10-15",
    "genero": "Ciencia ficción",
    "calificacion": 5,
    "createdAt": "2026-10-15T00:00:00.000Z"
  }
]
```

### POST /registros

Crea una nueva reseña.

```http
POST /registros
Content-Type: application/json
```

Ejemplo de cuerpo:

```json
{
  "pelicula": "Interstellar",
  "nombre": "Ricardo Landívar",
  "email": "ricardo@example.com",
  "descripcion": "Una reseña de ejemplo con suficiente contenido.",
  "fecha": "2026-10-15",
  "genero": "Ciencia ficción",
  "calificacion": 5
}
```

Respuestas principales:

- `200` — consulta realizada correctamente
- `201` — registro creado correctamente
- `400` — datos inválidos
- `500` — error interno del servidor

## Persistencia

Los registros se almacenan en:

```text
backend/data/registros.json
```

El servicio:

```text
backend/services/storage.js
```

se encarga de leer y escribir el archivo sin perder los registros anteriores.

Para verificar la persistencia:

1. Crear una reseña válida.
2. Confirmar que aparece en `registros.json`.
3. Detener el backend.
4. Iniciar nuevamente `node server.js`.
5. Consultar `/lista`.
6. Verificar que la reseña continúa disponible.

## Flujo de datos

```text
Formulario React
      ↓
fetch POST /registros
      ↓
API Express
      ↓
Validación del servidor
      ↓
registros.json
      ↓
GET /registros
      ↓
Lista en React
```

## Validaciones

El proyecto aplica validaciones tanto en el frontend como en el backend:

- campos obligatorios;
- formato de correo electrónico;
- descripción con longitud válida;
- fecha válida y no futura;
- género obligatorio;
- calificación entre 1 y 5.

## Pruebas principales

- navegación entre `/`, `/registro` y `/lista`;
- lista vacía;
- formulario inválido;
- registro válido;
- respuesta `201`;
- consulta `GET /registros`;
- respuesta `400` para datos inválidos;
- manejo de error cuando el backend no está disponible;
- persistencia después de reiniciar el backend;
- responsive en escritorio y móvil.

## Repositorio

https://github.com/ricardolandivar69/reelbyte

