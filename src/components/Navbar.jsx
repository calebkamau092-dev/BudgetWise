import { useState } from "react";
import "../styles/Navbar.css";

// Navbar component
function Navbar({ page, setPage }) {

  // Keeps track of whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // These are the pages displayed in the navigation bar
  const links = [
    { name: "Dashboard", page: "dashboard" },
    { name: "Transactions", page: "transactions" },
    { name: "Reports", page: "reports" },
    { name: "About", page: "about" }
  ];

  // Changes the current page and closes the mobile menu
  const handleNavigation = (selectedPage) => {
    setPage(selectedPage);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* BudgetWise logo and name */}
      <div className="navbar-logo">

        <div className="logo-icon">
          💳
        </div>

        <button
          className="logo-name"
          onClick={() => handleNavigation("dashboard")}
        >
          BudgetWise
        </button>

      </div>


      {/* Navigation links for larger screens */}
      <div className="navbar-links">

        {links.map((link) => (
          <button
            key={link.page}
            onClick={() => handleNavigation(link.page)}
            className={
              page === link.page
                ? "nav-link active"
                : "nav-link"
            }
          >
            {link.name}
          </button>
        ))}

      </div>


      {/* Buttons displayed on the right side */}
      <div className="navbar-actions">

        {/* Notification button */}
        <button
          className="notification-button"
          title="Notifications"
        >

          {/* Small dot showing a notification */}
          <span className="notification-dot"></span>
        </button>


        {/* Button for adding a transaction */}
        <button
          className="add-transaction-button"
          onClick={() => handleNavigation("add")}
        >
          <span className="plus-icon">+</span>
          Add Transaction
        </button>


        {/* User profile */}
        <button
          className="user-profile"
          title="User Profile"
        >
          RK
        </button>


        {/* Button for opening the mobile menu */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* Show the menu when the mobile button is clicked */}
      {menuOpen && (
        <div className="mobile-menu">

          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavigation(link.page)}
              className={
                page === link.page
                  ? "mobile-nav-link active"
                  : "mobile-nav-link"
              }
            >
              {link.name}
            </button>
          ))}


          {/* Add transaction button for mobile users */}
          <button
            className="mobile-add-button"
            onClick={() => handleNavigation("add")}
          >
            + Add Transaction
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;