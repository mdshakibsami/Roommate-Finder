import "./navbar.css";
import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Tooltip } from "react-tooltip";
import logo from "../assets/roommateLogo.png";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink className="font-bold hover:text-[#3289c9]" to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className="font-bold hover:text-[#3289c9]" to="/browse">
          Browse Listing
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink className="font-bold hover:text-[#3289c9]" to="/add">
            Add Listing
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink
            className="font-bold hover:text-[#3289c9]"
            to={`/my-listings/${user?.email}`}
          >
            My Listings
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink className="font-bold hover:text-[#3289c9]" to={"/dashboard"}>
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink className="font-bold hover:text-[#3289c9]" to="/about">
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-sm sticky top-0 z-50 px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <img className="w-10 h-10" src={logo} alt="" />
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
            {" "}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/MSsVhq8/placeholder.png"
                    }
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#3289c9]"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content={user.displayName || "User"}
                  />
                  <Tooltip id="user-tooltip" place="bottom" />
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost hover:text-[#3289c9]"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="btn btn-ghost hover:text-[#3289c9]"
                >
                  Sign In
                </NavLink>
                <Link
                  to="/register"
                  className="btn btn-primary bg-[#3289c9] hover:bg-[#2778b5] text-white border-none"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
