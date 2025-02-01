import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear storage
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to login page
    navigate("/");
  };

  return (
    <nav className="p-4 border-b flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/homecare"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-700 bg-indigo-300 p-3"
                : "text-gray-600 hover:text-indigo-900 p-3"
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
                ? "text-indigo-700 bg-indigo-300 p-3"
                : "text-gray-600 hover:text-indigo-900 p-3"
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
                ? "text-indigo-700 bg-indigo-300 p-3"
                : "text-gray-600 hover:text-indigo-900 p-3"
            }
          >
            Physiotherapist
          </NavLink>
        </li>
      </ul>

      {/* Logout Button on the Right */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ml-auto" >
        {/* <i className="ri-logout-box-r-fill text-lg"></i>  */}
        <i class="ri-logout-box-r-line text-lg"></i>
        {/* <span>Logout</span> */}
      </button>
    </nav>
  );
};

export default Navbar;
