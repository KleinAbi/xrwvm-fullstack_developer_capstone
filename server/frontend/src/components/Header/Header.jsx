import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {

  // Logout handler
  const logout = async (e) => {
    e.preventDefault();

    try {
      const logout_url = window.location.origin + "/djangoapp/logout/";
      const res = await fetch(logout_url, {
        method: "GET",
        credentials: "include" // send cookies to Django
      });

      const json = await res.json();
      if (json.status === "Logged out") {
        const username = sessionStorage.getItem('username');
        sessionStorage.removeItem('username'); // clear session storage

        alert("Logging out " + username + "...");

        // Update header UI immediately
        const usernameElem = document.querySelector('.username');
        const logoutLink = document.querySelector('.nav_item');
        if (usernameElem) usernameElem.remove();
        if (logoutLink) logoutLink.remove();

      } else {
        alert(json.error || "The user could not be logged out.");
      }
    } catch (err) {
      console.error(err);
      alert("Logout request failed.");
    }
  };

  // Default home page items
  let home_page_items = <div></div>;

  // Get current username from sessionStorage
  const curr_user = sessionStorage.getItem('username');

  // If logged in, show username and logout link
  if (curr_user) {
    home_page_items = (
      <div className="input_panel">
        <span className='username'>{curr_user}</span>
        <a className="nav_item" href="#" onClick={logout}>Logout</a>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "darkturquoise", height: "1in" }}>
        <div className="container-fluid">
          <h2 style={{ paddingRight: "5%" }}>Dealerships</h2>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" style={{ fontSize: "larger" }} aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/contact">Contact Us</a>
              </li>
            </ul>
            <span className="navbar-text">
              <div className="loginlink" id="loginlogout">
                {home_page_items}
              </div>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
