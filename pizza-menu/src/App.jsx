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
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We're still working on our menu. Please come back later 😆</p>
      )}

      {/* Translate to if statement */}

      {/* {pizzas && (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      )} 
       */}

      {/*
      <ul className="pizzas">
        /* <Pizza
          name="Pizza Spinaci"
          ingredients="Tomato, mozarella, spinach, and ricotta cheese"
          photoName="pizzas/spinaci.jpg"
          price={15.25}
        />
        <Pizza
          name="Pizza Funghi"
          ingredients="Tomato, mushrooms"
          photoName="pizzas/funghi.jpg"
          price={10.75}
        /> 
         {pizzaData.map((pizza) => (
          <Pizza name={pizza.name} photoName={pizza.photoName}/>
        ))} 

        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name} />
        ))}
      </ul>*/}
    </main>
  );
}

function Pizza(props) {
  // console.log(props);
  return (
    // <div className="pizza">
    //   <img src={props.photoName} alt={props.name} />
    //   <div>
    //     <h3 style={{ color: "green", fontSize: "24px" }}>{props.name}</h3>
    //     <p>{props.ingredients}</p>
    //     <span>$ {props.price}</span>
    //   </div>
    // </div>
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3 style={{ color: "green", fontSize: "24px" }}>
          {props.pizzaObj.name}
        </h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>$ {props.pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // alert("Sorry we're closed!");
  // console.log(hour);
  return (
    <footer className="footer">
      {/* {new Date().toLocaleTimeString()} We are currently open */}
      {isOpen ? (
        <Open closeHour={closeHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
}

function Open(props) {
  return (
    <div className="order">
      <p>{new Date().toLocaleTimeString()}</p>
      <p>
        We are open until {props.closeHour}:00. Come visit us or order online.
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
};

export default App;
