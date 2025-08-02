const { Link, NavLink } = ReactRouterDOM;
const { useState, useEffect } = React;

export function AppHeader() {
  const [menuToggle, setMenuToggle] = useState(false);




function onToggleMenu() {
    document.querySelector('body').classList.toggle('menu-open')
   setMenuToggle(menuToggle=>!menuToggle)
}

  return (
<header className={`app-header ${menuToggle ? 'menu-open' : ''}`}>
      <Link to="/">
        <h3>App Sus ✨</h3>
      </Link>
      <div className="header-items">

      <nav className="header-nav-bar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
      </nav>
        <button className="btn-toggle-menu" onClick={onToggleMenu}>
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
        </button>
      </div>
    </header>
  );
}
