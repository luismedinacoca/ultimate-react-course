import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

export default function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>HomePage</h1>
      {/*
      <main className={styles.homepage}>
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
      </section>
      </main>
       */}

      {/*
       <a href="/pricing">Pricing</a>
      */}
      {/*
      <Link to='/pricing' >Pricing</Link>
      <br />
      <Link to='/product' >Product</Link>
      */}
      <Link to="/app">Go to the app</Link>
    </div>
  );
}
