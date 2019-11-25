import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reset_password } from "../../actions/auth";

const Reset_Password = ({ reset_password, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    hash: "",
    new_password: "",
    confirm_new_password: ""
  });

  const { hash, new_password, confirm_new_password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    reset_password(hash, new_password, confirm_new_password, history);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Set a new password</h1>
      <p className="lead">Now you can set a new password</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <small className="form-text">
            Paste here the code (hash), recieved from email
          </small>
          <input
            type="text"
            placeholder="Code"
            name="hash"
            value={hash}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <small className="form-text">Enter a new passowod</small>
          <input
            type="password"
            placeholder="New password"
            name="new_password"
            onChange={e => onChange(e)}
            value={new_password}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm the password"
            name="confirm_new_password"
            onChange={e => onChange(e)}
            value={confirm_new_password}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
      <p className="my-1">
        Do not have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Reset_Password.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { reset_password })(Reset_Password);
