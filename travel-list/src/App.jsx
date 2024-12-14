import PropTypes from "prop-types";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: true },
  { id: 4, description: "Socks", quantity: 12, packed: false },
];

const App = () => {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
};

const Logo = () => {
  return <h1>🌴 Far Away 🧳</h1>;
};

const Form = () => {
  //input field:
  const [description, setDescription] = useState(""); //attempt to add some value inside useState then go to webpage
  const [qty, setQty] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    //! avoid create an item without description:
    if (!description) return;

    //TODO create a new item
    const newItem = { description, qty, packed: false, id: Date.now() };
    console.log(newItem);

    //! reset those fields: qty and item description:
    setDescription("");
    setQty(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥰 trip?</h3>
      <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      <em>💼 You have X itemson your list, and you already packed X (X%)</em>
    </footer>
  );
};

export default App;

// Props Validation:
Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    packed: PropTypes.bool.isRequired,
  }).isRequired,
};
