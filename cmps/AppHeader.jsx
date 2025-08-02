const { Link, NavLink } = ReactRouterDOM;
const { useState } = React;

export function AppHeader() {
  const [menuToggle, setMenuToggle] = useState(false);

  function onToggleMenu() {
    document.querySelector("body").classList.toggle("menu-open");
    setMenuToggle((menuToggle) => !menuToggle);
  }

  return (
    <header className={`app-header ${menuToggle ? "menu-open" : ""}`}>
      <Link to="/">
        <h3>
          App Sus <img src="../assets/img/favicon-32x32.png" alt=""  />
        </h3>
      </Link>
      <div className="header-items">
        <nav className="header-nav-bar">
          <NavLink to="/" onClick={onToggleMenu}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={onToggleMenu}>
            About
          </NavLink>
          <NavLink to="/mail" onClick={onToggleMenu}>
            Mail
          </NavLink>
          <NavLink to="/note" onClick={onToggleMenu}>
            Note
          </NavLink>
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
