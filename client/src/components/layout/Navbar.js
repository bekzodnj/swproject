import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout, user }) => {
  const authLinks = (
    <ul
      className="d-flex my-2 my-md-0 mr-md-3
      list-unstyled text-white ml-md-auto"
    >
      <Link to="/dashboard" className="p-2 text-white">
        Dashboard
      </Link>

      <Link to="/schedule" className="p-2 text-white">
        Schedule
      </Link>

      <Link to="/services" className="p-2 text-white">
        Services
      </Link>

      <a onClick={logout} href="#!" className="p-2 btn btn-outline-light">
        <span>Logout</span>
      </a>
    </ul>
  );

  let isTeacher = true;
  if (isAuthenticated) {
    if (user !== null) {
      if (user.role == "teacher") {
        isTeacher = true;
      } else if (user.role == "student") {
        isTeacher = false;
      }
    }
  }

  const studentLinks = (
    <ul
      className="d-flex my-2 my-md-0 mr-md-3
      list-unstyled text-white ml-md-auto"
    >
      <Link to="/student-dashboard" className="p-2 text-white">
        <i className="fas fa-user"></i> My Dashboard
      </Link>

      <a onClick={logout} href="#!" className="p-2 text-white">
        <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
      </a>
    </ul>
  );

  const guestLinks = (
    <ul
      className="d-flex my-2 my-md-0 mr-md-3
    list-unstyled text-white ml-md-auto"
    >
      <a href="#!" className="p-2 text-white">
        News
      </a>

      <Link to="/register" className="p-2 text-white">
        Register
      </Link>

      <Link to="/login" className="p-2 text-white">
        Login
      </Link>
    </ul>
  );

  return (
    <nav
      className="d-flex flex-column 
    flex-md-row align-items-center p-3 
    px-md-4 mb-3 bg-dark border-bottom shadow-sm"
    >
      <h1>
        <Link to="/" className="text-white my-0 font-weight-normal">
          <i className="fas fa-book"></i>
        </Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated
            ? isTeacher
              ? authLinks
              : studentLinks
            : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navbar);
