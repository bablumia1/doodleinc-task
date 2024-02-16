import { FC, useContext } from "react";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../context";

const DarkMode: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="dark_mode">
      <input
        className="hidden dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={theme === "dark"}
      />
      <label
        className="flex items-center justify-center w-10 rounded-full cursor-pointer dark_mode_label"
        htmlFor="darkmode-toggle"
      >
        {theme === "dark" ? (
          <FaMoon className="w-6 h-6 text-gray-600 dark:text-white" />
        ) : (
          <MdWbSunny className="w-6 h-6 text-yellow-500" />
        )}
      </label>
    </div>
  );
};

export default DarkMode;
