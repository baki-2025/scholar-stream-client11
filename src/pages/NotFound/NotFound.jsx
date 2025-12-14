import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4">
      <h1 className="text-6xl font-bold text-error">404</h1>
      <h2 className="text-2xl font-semibold mt-4">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 rounded bg-primary text-white hover:bg-primary-focus"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
