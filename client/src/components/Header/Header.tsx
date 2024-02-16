import { useContext } from "react";
import Logo from "../../assets/Logo.png";
import LogoDark from "../../assets/Logo-dark.png";
import DarkMode from "../DarkMode/DarkMode";
import { AuthContext, ThemeContext } from "../../context";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav
      className={`sticky top-0 z-10 border-b backdrop-filter backdrop-blur-lg bg-opacity-30
    ${theme === "dark" ? "border-gray-700" : "border-gray-300"}
    `}
    >
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-semibold text-gray-900">
            {theme === "dark" ? (
              <img src={LogoDark} alt="Logo" className="" />
            ) : (
              <img src={Logo} alt="Logo" className="" />
            )}
          </Link>
          <div className="flex space-x-4">
            {isAuthenticated && <Link to="/profile">Profile</Link>}
            <DarkMode />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
