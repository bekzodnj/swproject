import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    secretQuestion: "",
    secretAnswer: ""
  });

  const [role, setUserRole] = useState("");

  const handleRadioChange = e => {
    setUserRole(e.target.value);
  };

  const {
    name,
    email,
    password,
    password2,
    secretQuestion,
    secretAnswer
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password, secretQuestion, secretAnswer, role });
    }
  };

  if (isAuthenticated) {
    // return <Redirect to="/dashboard" />;
    if (user !== null) {
      if (user.role === "teacher") {
        return <Redirect to="/dashboard" />;
      } else if (user.role === "student") {
        return <Redirect to="/student-dashboard" />;
      }
    }
  }

  if (user !== null) {
    console.log("User ROle:", user.role);
  }

  return (
    <div className="row">
      <div className="col-md-7 col-12 my-3 p-5 bg-white rounded shadow-lg">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="text-muted">
          <i className="fas fa-user"></i> Create Your Account
        </p>

        <h2>You are:</h2>
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value="student"
              onChange={e => handleRadioChange(e)}
            />
            Student
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value="teacher"
              onChange={e => handleRadioChange(e)}
            />
            Teacher
          </label>
        </div>
        <form className="form mt-2" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="name"
              required
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group mt-2">
            <p className="form-text text-secondary text-muted">
              In order to be able to recover your password, provide answer for
              questionaire
            </p>
            <select
              name="secretQuestion"
              className="form-control"
              onChange={e => onChange(e)}
              value={secretQuestion}
            >
              <option>Custom secret answer</option>
              <option>Your favourite author/book</option>
              <option>Your favourite music artist</option>
              <option>School you went </option>
              <option>Your hometown</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Type secret answer"
              className="form-control"
              name="secretAnswer"
              onChange={e => onChange(e)}
              value={secretAnswer}
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { setAlert, register })(Register);
