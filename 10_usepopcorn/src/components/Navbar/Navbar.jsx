import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import NumResult from "../NumResult/NumResult";

const Navbar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default Navbar;
