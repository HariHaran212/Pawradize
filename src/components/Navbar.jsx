import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { FaPaw } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { HiOutlineCog, HiOutlineLogout, HiOutlineMenuAlt1, HiOutlineUserCircle, HiOutlineClipboardList, HiOutlineShoppingBag, HiOutlineShoppingCart } from "react-icons/hi";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const { user, isAuthenticated, logout } = useUser();

  // Check for auth token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleScroll = () => setDropdownOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-ivory/70 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-bold text-primary hover:text-secondary transition-colors"
        >
          <FaPaw className="text-primary text-2xl" />
          <span>
            Pawradize
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-black font-medium">
          <Link to="/find-a-friend" className="hover:text-primary transition">
            Find a Friend
          </Link>
          <Link to="/shop" className="hover:text-primary transition">
            Shop
          </Link>
          <Link to="/pet-care-resources" className="hover:text-primary transition">
            Pet Care Resources
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-primary transition">
            Contact
          </Link>
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4 relative">
          {/* <button className="hidden md:inline px-4 py-2 rounded-lg border border-primary text-primary hover:bg-highlight transition">
            Search
          </button> */}

          {isAuthenticated && user ? (
            <>
              <Link
                to="/cart"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition"
              >
                <HiOutlineShoppingCart />Cart
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={user.avatarUrl || `https://placehold.co/100?text=${user.name.charAt(0)}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="hidden sm:block text-sm font-medium text-text-dark">{user.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100">
                    <Link
                      to="/account"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-ivory hover:text-primary rounded-t-lg"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <HiOutlineUserCircle /> Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-ivory hover:text-primary"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <HiOutlineShoppingBag />My Orders
                    </Link>
                    <Link
                      to="/my-requests"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-ivory hover:text-primary"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <HiOutlineClipboardList />My Requests
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-ivory hover:text-primary"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <HiOutlineCog /> Settings
                    </Link>
                    <hr className="my-2 border-accent" />
                    <Link
                      to="/login"
                    >
                      <button
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                        onClick={handleLogout}
                      >
                        <HiOutlineLogout /> Logout
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
