import { showSuccessMsg } from "../services/event-bus.service.js";
const { Link, NavLink } = ReactRouterDOM;

export function Home() {
  return (
    <section className="home-box">
      <h2>App Sus</h2> <h3>Inspired by </h3>
      <div className="logo-box">
        <img src="../assets/img/gmail.png" alt=""  />
        <img src="../assets/img/google-keep.png" alt=""  />
      </div>
      <h3>Links</h3>
      <div className="link-box">
        <button>
          <NavLink to="/mail">Mail</NavLink>
        </button>
        <button>
          <NavLink to="/note">Note</NavLink>
        </button>
      </div>
    </section>
  );
}
