import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Ir al inicio de ReelByte">
          <span className="brand-mark" aria-hidden="true">
            <span></span><span></span><span></span>
          </span>
          <span className="brand-name">ReelByte</span>
          <span className="brand-by">by TechLab</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Abrir menú</span>
          <span></span><span></span><span></span>
        </button>

        <nav id="main-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
          <Link to="/" onClick={closeMenu}>Inicio</Link>
          <Link to="/registro" onClick={closeMenu}>Publicar reseña</Link>
          <Link to="/lista" onClick={closeMenu}>Explorar</Link>
        </nav>
      </div>
    </header>
  )
}
