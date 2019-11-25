import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pass_recovery } from "../../actions/auth";

const Recovery = ({ pass_recovery, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    secretQuestion: "",
    secretAnswer: ""
  });

  const { email, secretQuestion, secretAnswer } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    pass_recovery(email, secretQuestion, secretAnswer);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Recover your password</h1>
      <p className="lead">
        <i className="fas fa-user"></i> After filling the form you'll recieve an
        email for instructions
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <small className="form-text">
            In order to recover your password, provide answer for questionaire
          </small>
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Do not have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Recovery.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { pass_recovery })(Recovery);
