import PropTypes from "prop-types";
import { useState } from "react";

//************** APP component  **************/
const App = () => {
  const [items, setItems] = useState([]);

  function handleDeleteItem(id) {
    // console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
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
    // console.log(newItem);

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
const PackingList = ({ items, onDeleteItem, onToggleItem }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
};

//************** ITEM component  **************/
const Item = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
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

//************** PROPS validation **************/
Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    packed: PropTypes.bool.isRequired,
  }).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired,
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
  onDeleteItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired,
};

Form.propTypes = {
  onAddItems: PropTypes.func.isRequired,
};

export default App;
