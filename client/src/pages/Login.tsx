import Logo from "../assets/Logo.png";
import LogoDark from "../assets/Logo-dark.png";
import { AuthContext, ThemeContext } from "../context";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import TextInput from "../components/AuthForm/TextInput";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("bablu@gmail.com");
  const [password, setPassword] = useState("12345678");
  const { loading, login, error, success, clearError } =
    useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSumit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields!");
    }
    login(email, password);
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
            Sign in to your account
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
              label="Email address"
              type="email"
              id="email"
              name="email"
              defaultValue="bablu@gmail.com"
              autoComplete="email"
              onChange={handleChange}
            />

            <TextInput
              label="Password"
              type="password"
              id="password"
              name="password"
              defaultValue="12345678"
              autoComplete="current-password"
              onChange={handleChange}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
