import { useContext } from "react";
import { ThemeContext } from "../../context";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`h-16 flex items-center justify-center border-t ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      } `}
    >
      <div className="flex items-center justify-center w-full px-4 mx-auto max-w-7xl ">
        <div>
          <p className="text-sm text-gray-500">
            &copy; Coptright {new Date().getFullYear()} - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
