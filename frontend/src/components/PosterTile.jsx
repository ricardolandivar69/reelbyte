const genreClass = {
  Drama: 'poster-drama',
  Comedia: 'poster-comedia',
  'Ciencia ficción': 'poster-scifi',
  Terror: 'poster-terror',
  Acción: 'poster-accion',
  Romance: 'poster-romance',
  Animación: 'poster-animacion',
  Documental: 'poster-documental',
  Otro: 'poster-otro',
}

export default function PosterTile({ title, genre = 'Otro', compact = false }) {
  const initial = title?.trim()?.charAt(0)?.toUpperCase() || 'R'

  return (
    <div className={`poster-tile ${genreClass[genre] || genreClass.Otro} ${compact ? 'poster-compact' : ''}`} aria-hidden="true">
      <span className="poster-kicker">REELBYTE</span>
      <strong>{initial}</strong>
      <span className="poster-genre">{genre}</span>
    </div>
  )
}
