import { Link } from "react-router-dom";
import { DarkModeToggle } from "./index.js";

export const Navbar = () => {
  return (
    <header className="shadow-sm bg-white dark:bg-gray-900 dark:text-white">
      <nav
        className="flex justify-between items-center px-6 py-4"
        aria-label="Main navigation"
      >
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            HireSmart ATS
          </h1>
        </Link>
        <div className="space-x-4">
          <DarkModeToggle />
          <Link
            to="/login"
            aria-label="Login to your account"
            className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-500 dark:hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            aria-label="Sign up for a new account"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};
