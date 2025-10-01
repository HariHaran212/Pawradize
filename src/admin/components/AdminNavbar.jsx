import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX, HiOutlineUserCircle, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import { FaPaw } from 'react-icons/fa';

export default function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleScroll = () => setIsProfileOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const navLinks = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Orders', href: '/admin/orders' },
    { name: 'Products', href: '/admin/products' },
    { name: 'Pets', href: '/admin/pets' },
    { name: 'Content', href: '/admin/content' },
    { name: 'Visit Requests', href: '/admin/visit-requests' },
    { name: 'Users', href: '/admin/users' },
  ];

  // NavLink style for active links
  const activeLinkStyle = {
    color: '#8EBC38', // primary color
    fontWeight: '600',
  };

  return (
    <header className="bg-ivory/70 backdrop-blur-md shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo and Nav */}
          <div className="flex items-center gap-8">

            {/* Logo */}
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-xl font-bold text-primary hover:text-secondary transition-colors"
            >
              <FaPaw className="text-primary text-2xl" />
              <span>
                Pawradise <span className="font-normal text-text-medium">Admin</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-black font-medium">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                  className="font-medium text-black hover:text-primary transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Side: Profile Dropdown */}
          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsProfileOpen(!dropdownOpen)} className="flex items-center gap-2">
                <img src="https://via.placeholder.com/100" alt="Admin Avatar" className="w-8 h-8 rounded-full" />
                <span className="hidden sm:block text-sm font-medium text-text-dark">John Doe</span>
              </button>
              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                  <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-text-dark hover:bg-ivory">
                    <HiOutlineUserCircle /> My Profile
                  </Link>
                  <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-text-dark hover:bg-ivory">
                    <HiOutlineCog /> Settings
                  </Link>
                  <hr className="my-2 border-accent" />
                  <Link to="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                    <HiOutlineLogout /> Log Out
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-accent">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="text-text-dark hover:text-primary p-2 rounded-md"
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}