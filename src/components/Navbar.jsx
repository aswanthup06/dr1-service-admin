import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-blue-500'
                : 'text-gray-300 hover:text-white'
            }
          >
            Home Care
          </NavLink>

          
          
        </li>
        <li>
          <NavLink
            to="/details"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-blue-500'
                : 'text-gray-300 hover:text-white'
            }
          >
            Home Care Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hospital-assist"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-blue-500'
                : 'text-gray-300 hover:text-white'
            }
          >
            Hospital Assist
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hospital-assist/details"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-blue-500'
                : 'text-gray-300 hover:text-white'
            }
          >
            Hospital Assist Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/physiotherapist"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-blue-500'
                : 'text-gray-300 hover:text-white'
            }
          >
            Physiotherapist
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/physiotherapist/details"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-blue-500'
                : 'text-gray-300 hover:text-white'
            }
          >
            Physiotherapist Details
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
