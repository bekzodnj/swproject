import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated, user }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }
  if (isAuthenticated) {
    if (user !== null) {
      if (user.role == "teacher") {
        return <Redirect to="/dashboard" />;
      } else if (user.role == "student") {
        return <Redirect to="/student-dashboard" />;
      }
    }
  }
  //
  return (
    <div className="row">
      <div className="col-md-5 col-12 my-3 p-5 bg-white rounded shadow-lg">
        <div className="">
          <h1 className="large text-primary">Login</h1>
          <p className="lead text-muted">
            <i className="fas fa-user"></i> Sign Into Your Account
          </p>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="form-control"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                className="form-control"
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Do not have an account? <Link to="/register">Sign Up</Link>
          </p>
          <p className="my-1">
            Forgot your password? <Link to="/recovery">Password Recovery</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { login })(Login);
