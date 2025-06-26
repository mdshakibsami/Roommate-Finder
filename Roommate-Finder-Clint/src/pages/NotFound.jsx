import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-9xl font-bold text-[#3289c9]">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="space-y-4">
          <div className="w-16 h-1 bg-[#3289c9] mx-auto"></div>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#3289c9] text-white rounded-lg hover:bg-[#2778b5] transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
