import "./navbar.css";
import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Tooltip } from "react-tooltip";
import { useTheme } from "../hooks/use-theme";
import Swal from "sweetalert2";
import logo from "../assets/roommateLogo.png";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3289c9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Logged Out!',
              text: 'You have been successfully logged out.',
              timer: 1500,
              showConfirmButton: false,
              position: 'top-end',
              toast: true,
            });
          })
          .catch((error) => {
            console.error("Error logging out:", error);
            Swal.fire({
              icon: 'error',
              title: 'Logout Failed',
              text: 'There was an error logging you out. Please try again.',
              showConfirmButton: true,
              position: 'center',
            });
          });
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink className={`font-bold hover:text-[#3289c9] ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`} to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className={`font-bold hover:text-[#3289c9] ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`} to="/browse">
          Browse Listing
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink className={`font-bold hover:text-[#3289c9] ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`} to="/add">
            Add Listing
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink
            className={`font-bold hover:text-[#3289c9] ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}
            to={`/my-listings/${user?.email}`}
          >
            My Listings
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink className={`font-bold hover:text-[#3289c9] ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`} to={"/dashboard"}>
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink className={`font-bold hover:text-[#3289c9] ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`} to="/about">
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className={`navbar shadow-sm sticky top-0 z-50 px-2 sm:px-4 lg:px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className={`btn btn-ghost lg:hidden ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="hidden lg:block">
          <img className="w-10 h-10 rounded-full border-2 border-[#3289c9] bg-white shadow" src={logo} alt="RoommateFinder Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end ">
        {loading ? (
          ""
        ) : (
          <>
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-800'}`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                )}
              </button>

            {" "}
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/MSsVhq8/placeholder.png"
                    }
                    alt={user.displayName || "User"}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#3289c9] shadow-sm"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content={user.displayName || "User"}
                  />
                  <Tooltip id="user-tooltip" place="bottom" />
                </div>
                <button
                  onClick={handleLogout}
                  className={`btn btn-ghost btn-sm sm:btn-md hover:text-[#3289c9] text-sm sm:text-base ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}
                >
                  <span className="hidden sm:inline">Log out</span>
                  <span className="sm:hidden">Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <NavLink
                  to="/login"
                  className={`btn btn-ghost btn-sm sm:btn-md hover:text-[#3289c9] text-sm sm:text-base ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">In</span>
                </NavLink>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm sm:btn-md bg-[#3289c9] hover:bg-[#2778b5] text-white border-none text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Sign Up</span>
                  <span className="sm:hidden">Up</span>
                </Link>
              </div>
            )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
