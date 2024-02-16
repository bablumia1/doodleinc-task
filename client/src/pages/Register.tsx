import Logo from "../assets/Logo.png";
import LogoDark from "../assets/Logo-dark.png";
import { AuthContext, ThemeContext } from "../context";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import TextInput from "../components/AuthForm/TextInput";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const { registerUser, error, loading, success, clearError } =
    useContext(AuthContext);

  const handleSumit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields!");
    }
    registerUser(name, email, password);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      window.location.href = "/";
    }
  }, [success]);

  return (
    <div>
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="w-auto h-10 mx-auto"
            src={theme === "dark" ? LogoDark : Logo}
            alt="Your Company"
          />
          <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-center ">
            Sign up a new account
          </h2>
        </div>

        <div
          className={`
            mt-8 sm:mx-auto sm:w-full sm:max-w-md  ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            } shadow sm:rounded-lg p-5
            `}
        >
          <form className="space-y-6" onSubmit={handleSumit}>
            <TextInput
              label="Full name"
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              onChange={handleChange}
            />

            <TextInput
              label="Email address"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />

            <TextInput
              label="Password"
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading..." : "Sign up"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
