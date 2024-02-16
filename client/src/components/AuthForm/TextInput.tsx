import { ChangeEvent, FC, InputHTMLAttributes, useContext } from "react";
import { ThemeContext } from "../../context";

type TextInputProps = {
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput: FC<TextInputProps> = ({ label, onChange, ...inputProps }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <label
        htmlFor={inputProps.id}
        className="block text-sm font-medium leading-6 "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...inputProps}
          className={`
            appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
            ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}
            ${theme === "dark" ? "border-gray-700" : "border-gray-300"}
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
            `}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextInput;
