import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to={"/"}>
        <p>Product List</p>
      </Link>
    </header>
  );
};

export default Header;
