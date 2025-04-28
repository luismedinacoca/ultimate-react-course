import { Link, NavLink } from 'react-router-dom';

const PageNav = () => {
  return (
    <nav>
      <ul>
        {/*
        <li> <Link to="/">Home</Link></li>
        <li> <Link to="/pricing">Pricing</Link></li>
        <li> <Link to="/product">Product</Link></li>
        */}
        <NavLink to="/">Home</NavLink> {" "}
        <NavLink to="/pricing">Pricing</NavLink>{" "}
        <NavLink to="/product">Product</NavLink>
      </ul>
    </nav>
  )
}

export default PageNav
