import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Games",
      link: "/all-games",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if(isLoggedIn===true && role==="user")
  {
    links.splice(4,1);
  }
  if(isLoggedIn===true && role==="admin")
  {
    links.splice(3,1);
  }
  return (
    <div className="flex bg-zinc-800 text-white px-8 py-2 items-center justify-between">
      <div className="flex items-center">
        <img className="h-12 me-4" src={logo} alt="logo" />
        <h1 className="text-2xl font-semibold">Byte'em Up</h1>
      </div>
      <div className="nav-links-store flex items-center gap-4">
        <div className=" flex gap-4">
          {links.map((items, i) => (
            <div className="flex items-center justify-center">
              {items.title === "Profile" || items.title=== "Admin Profile" ? (
                <Link
                  to={items.link}
                  className=" px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                  key={i}
                >
                  {items.title}
                </Link>
              ) : (
                <Link
                  to={items.link}
                  className="hover:text-blue-500 transition-all duration-300"
                  key={i}
                >
                  {items.title}
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {isLoggedIn === false && (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
