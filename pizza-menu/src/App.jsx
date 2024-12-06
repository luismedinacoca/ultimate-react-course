import React from "react";
import PropsType from "prop-types";
import "./index.css";

/*
 $ npm install --save prop-types
 import PropsType from 'prop-types'

 PropsType.propTypes = {
   prop: PropsType.node,
 };

*/

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 ? (
        <React.Fragment key={Math.random()}>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <p>We're still working on our menu. Please come back later 😆</p>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  console.log(pizzaObj);
  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3 style={{ color: "green", fontSize: "24px" }}>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>$ {pizzaObj.price}</span>
      </div>
    </li>
  );
}

Pizza.propTypes = {
  pizzaObj: PropsType.shape({
    name: PropsType.string.isRequired,
    ingredients: PropsType.string.isRequired,
    price: PropsType.number.isRequired,
    photoName: PropsType.string.isRequired,
    soldOut: PropsType.bool.isRequired,
  }).isRequired,
};

function Footer() {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // alert("Sorry we're closed!");
  // console.log(hour);
  return (
    <footer className="footer">
      {isOpen ? (
        <Open openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour} and {closeHour}
        </p>
      )}
    </footer>
  );
}

function Open({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        {new Date().toLocaleTimeString("es-AR", {
          hourCycle: "h23",
          hour: "2-digit",
          minute: "2-digit",
        })}
        h
      </p>
      <p>
        We are open from {openHour}:00h until {closeHour}:00h. Come visit us or
        order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
PropsType.propTypes = {
  prop: PropsType.node,
};

Open.propTypes = {
  closeHour: PropsType.number.isRequired,
  openHour: PropsType.number.isRequired,
};

export default App;
