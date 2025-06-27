import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { AuthContext } from "../contexts/auth";
import { useTheme } from "../hooks/use-theme";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "Successfully logged in",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message
      });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Successfully signed in with Google",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: err.message
      });
      setError(err.message);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Welcome Back!</h2>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Please sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className={`border px-4 py-3 rounded relative ${theme === 'dark' ? 'bg-red-900 border-red-700 text-red-300' : 'bg-red-100 border-red-400 text-red-700'}`}
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none relative block w-full px-12 py-3 border rounded-lg focus:outline-none focus:ring-[#3289c9] focus:border-[#3289c9] focus:z-10 sm:text-sm ${
                    theme === 'dark' 
                      ? 'border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800' 
                      : 'border-gray-300 placeholder-gray-500 text-gray-900 bg-white'
                  }`}
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none relative block w-full px-12 py-3 border rounded-lg focus:outline-none focus:ring-[#3289c9] focus:border-[#3289c9] focus:z-10 sm:text-sm ${
                    theme === 'dark' 
                      ? 'border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800' 
                      : 'border-gray-300 placeholder-gray-500 text-gray-900 bg-white'
                  }`}
                  placeholder="Password"
                />
              </div>
            </div>
          </div>{" "}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#3289c9] hover:bg-[#2778b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3289c9] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`w-full flex justify-center items-center gap-2 py-3 px-4 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3289c9] ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              Continue with Google
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[#3289c9] hover:text-[#2778b5]"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
