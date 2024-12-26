import PropTypes from "prop-types";
import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 1, packed: true },
//   { id: 4, description: "shorts", quantity: 2, packed: false },
// ];

//************** APP component  **************/
const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
};

//************** LOGO component  **************/
const Logo = () => {
  return <h1>🌴 Far Away 🧳</h1>;
};

//************** FORM component  **************/
const Form = ({ onAddItems }) => {
  //input field:
  const [description, setDescription] = useState(""); //attempt to add some value inside useState then go to webpage
  const [qty, setQty] = useState(1);
  //adding new item as state => review lecture from 71 to 73 before continuing!
  // const [items, setItems] = useState([]); // => that should be moved to 1st Form & PackingList's parent component

  // const handleAddItems = (item) => {
  //   setItems((items) => [...items, item]);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    //! avoid create an item without description:
    if (!description) return;

    //TODO create a new item
    const newItem = { description, qty, packed: false, id: Date.now() };
    console.log(newItem);

    //handleAddItems(newItem);
    onAddItems(newItem);

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

//************** PACKINGLIST component  **************/
const PackingList = ({ items }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

//************** ITEM component  **************/
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

//************** STATS component  **************/
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

PackingList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      packed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

Form.propTypes = {
  onAddItems: PropTypes.func.isRequired,
};
