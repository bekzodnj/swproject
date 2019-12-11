import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <section className="landing">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "100vh"
          }}
        >
          <div style={{ marginTop: "-200px" }}>
            <h1 className="x-large">Management Tool</h1>
            <p className="lead">Welcome</p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="landing">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "100vh"
        }}
      >
        <div style={{ marginTop: "-200px" }}>
          <h1 className="display-4">Management Tool</h1>
          <p className="lead">
            Create a profile, see events & join events, discuss the material and
            so on
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/register" className="btn btn-primary mr-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);
