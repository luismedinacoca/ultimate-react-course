import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../service/apiRestaurant";
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();
  console.log(menu);

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// calling the getMenu from apiRestaurant.js
export async function loader(){
  const menu = await getMenu();
  return menu;
}

export default Menu;
