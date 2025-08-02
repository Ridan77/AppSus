const {  NavLink } = ReactRouterDOM;

export function Home() {
  return (
    <section className="home-box">
      <h2>App Sus</h2> <h3>Inspired by: </h3>
      <div className="logo-box">
        <img src="../assets/img/gmail.png" />
        <img src="../assets/img/google-keep.png"  />
      </div>
      <div className="link-box">
        <button>
          <NavLink to="/mail">Mr. EMail</NavLink>
        </button>
        <button>
          <NavLink to="/note">Miss Keep</NavLink>
        </button>
      </div>
    </section>
  );
}
