import PropTypes from "prop-types";
import { useState } from "react";

//************** FORM component  **************/
const Form = ({ onAddItems }) => {
  //input field:
  const [description, setDescription] = useState(""); //attempt to add some value inside useState then go to webpage
  const [quantity, setQuantity] = useState(1);
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
    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem);

    //handleAddItems(newItem);
    onAddItems(newItem);

    //! reset those fields: qty and item description:
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥰 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
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

export default Form;


//************** Form Props validation **************/
Form.propTypes = {
  onAddItems: PropTypes.func.isRequired,
};
