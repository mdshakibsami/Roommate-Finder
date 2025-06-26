import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { AuthContext } from "../contexts/auth";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    return (
      /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(formData.password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain uppercase, lowercase letters and be at least 6 characters long",
      });
      return;
    }

    setLoading(true);
    try {
      // Create user
      await createUser(formData.email, formData.password);

      // Update profile
      await updateUserProfile({
        displayName: formData.name,
        photoURL:
          formData.photoURL || "https://i.ibb.co/MSsVhq8/placeholder.png",
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now log in with your credentials",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        photoURL: "",
        password: "",
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Successfully signed in with Google",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: err.message,
      });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">
            Join our community and find your perfect roommate
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Register Form */}
        <form className="mt-8 space-y-6" onSubmit={handleEmailRegister}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#3289c9] focus:border-[#3289c9] focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#3289c9] focus:border-[#3289c9] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div>
              <label htmlFor="photoURL" className="sr-only">
                Photo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaImage className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="photoURL"
                  name="photoURL"
                  type="url"
                  required
                  value={formData.photoURL}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#3289c9] focus:border-[#3289c9] focus:z-10 sm:text-sm"
                  placeholder="Photo URL"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#3289c9] focus:border-[#3289c9] focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>{" "}
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#3289c9] hover:bg-[#2778b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3289c9] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3289c9]"
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              Continue with Google
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#3289c9] hover:text-[#2778b5]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
