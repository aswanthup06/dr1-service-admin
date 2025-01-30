import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 border-b">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/homecare"
            className={({ isActive }) =>
              isActive
                ? 'text-indigo-700 bg-indigo-300 p-3'
                : 'text-gray-600 hover:text-indigo-900 p-3'
            }
          >
            Home Care
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hospital-assist"
            className={({ isActive }) =>
              isActive
                 ? 'text-indigo-700 bg-indigo-300 p-3'
                 : 'text-gray-600 hover:text-indigo-900 p-3'
            }
          >
            Hospital Assist
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/physiotherapist"
            className={({ isActive }) =>
              isActive
                 ? 'text-indigo-700 bg-indigo-300 p-3'
                 : 'text-gray-600 hover:text-indigo-900 p-3'
            }
          >
            Physiotherapist
          </NavLink>
        </li>

       
      </ul>
    </nav>
  );
};

export default Navbar;
