import { Link, NavLink } from 'react-router-dom';
import { HiOutlineUserCircle, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';

const AdoptionCoordinatorNavbar = () => {
  const { user } = useUser(); // Get the logged-in user
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/adoption/' },
    { name: 'Pet Listings', href: '/adoption/pets' },
    { name: 'Visit Requests', href: '/adoption/visit-requests' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-8">
          <Link to="/adoption/dashboard" className="text-xl font-bold text-primary">Pawradise <span className="font-normal text-text-medium">Adoptions</span></Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.href} className={({ isActive }) => isActive ? 'text-sm font-semibold text-primary' : 'text-sm font-medium text-text-dark hover:text-primary'}>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Side: Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2">
            <img src="https://via.placeholder.com/100" alt="Admin Avatar" className="w-8 h-8 rounded-full" />
            <span className="hidden sm:block text-sm font-medium text-text-dark">
              {user?.name || 'Coordinator'}
            </span>
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
              <Link to="/adoption/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-text-dark hover:bg-ivory">
                <HiOutlineUserCircle /> My Profile
              </Link>
              <Link to="/adoption/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-text-dark hover:bg-ivory">
                <HiOutlineCog /> Settings
              </Link>
              <hr className="my-2 border-accent" />
              <Link to="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                <HiOutlineLogout /> Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdoptionCoordinatorNavbar;