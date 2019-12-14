import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../../actions/student/profile";
import { connect } from "react-redux";

const StudentProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    lastname: "",
    name: "",
    billing_address: "",
    preferred_lang: "",
    date_of_birth: "",
    type: "",
    place_of_study: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    lastname,
    name,
    billing_address,
    preferred_lang,
    date_of_birth,
    type,
    place_of_study,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Billing address"
            name="billing_address"
            value={billing_address}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Type billing address</small>
        </div>

        <div className="form-group">
          <select
            name="preferred_lang"
            value={preferred_lang}
            onChange={e => onChange(e)}
          >
            <option value="0">* Select preferred language</option>
            <option value="English">English</option>
            <option value="Russian">Russian</option>
            <option value="Hungarian">Hungarian</option>
          </select>
          <small className="form-text">Your language preference</small>
        </div>

        <div className="form-group">
          <input
            type="date"
            placeholder="Date of birth"
            name="date_of_birth"
            value={date_of_birth}
            className="form-control"
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <select name="type" value={type} onChange={e => onChange(e)}>
            <option value="0">* Select Student Status</option>
            <option value="School Student">School Student</option>
            <option value="College Student">College Student</option>
            <option value="University Student">University Student</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your education
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Place of study"
            name="place_of_study"
            value={place_of_study}
            className="form-control"
            onChange={e => onChange(e)}
          />
        </div>

        <div className="my-2">
          <button
            type="button"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Submit" />
      </form>
    </Fragment>
  );
};

StudentProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(StudentProfile));
