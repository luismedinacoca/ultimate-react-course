import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import { PackingList } from "./components/PackingList";
import { Stats } from "./components/Stats";

//************** APP component  **************/
const App = () => {
  const [items, setItems] = useState([]);
  /*
  ! Avoid having a new state for item numbers:
  const [numItems, setNumItems] = useState(0)
  */

  function handleDeleteItem(id) {
    // console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
    /* 
    ! avoir having a new state for item numbers:
    setNumItems( (num) => num + 1)
    */
  }

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
    console.log(item);
  };

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  function handleClearList() {
    //setItems([]);
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      {/*
      ! sending the items to stats: 
      */}
      <Stats items={items} />
    </div>
  );
};

export default App;
