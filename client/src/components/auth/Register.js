import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    secretQuestion: "",
    secretAnswer: ""
  });

  const [userRole, setUserRole] = useState("");

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
      register({ name, email, password, secretQuestion, secretAnswer });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>

      <h2>You are:</h2>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="role"
          value="student"
          onChange={e => handleRadioChange(e)}
        />
        <label class="form-check-label" for="gridRadios1">
          Student
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="role"
          value="teacher"
          onChange={e => handleRadioChange(e)}
        />
        <label class="form-check-label" for="gridRadios1">
          Teacher
        </label>
      </div>
      <form className="form mt-2" onSubmit={e => onSubmit(e)}>
        <h1>You are {userRole}</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
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
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <h3 className="form-text text-secondary">
            In order to be able to recover your password, provide answer for
            questionaire
          </h3>
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
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
