import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profile";
import { connect } from "react-redux";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    lastname: "",
    phone: "",
    date_of_birth: "",
    ac_degree: "",
    place_of_work: "",
    ac_title: "",
    ac_activities: "",
    ac_works: "",
    general_info: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    lastname,
    phone,
    date_of_birth,
    ac_degree,
    place_of_work,
    ac_title,
    ac_activities,
    ac_works,
    general_info,
    bio,
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
      <p className="lead text-muted">
        <i className="fas fa-user"></i> Let's get some information
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Last Name"
            className="form-control"
            name="lastname"
            value={lastname}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* Phone"
            name="phone"
            value={phone}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="date"
            className="form-control"
            placeholder="* Date of birth"
            name="date_of_birth"
            value={date_of_birth}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <select
            name="ac_degree"
            value={ac_degree}
            onChange={e => onChange(e)}
            className="form-control"
          >
            <option value="0">Choose academic degree</option>
            <option value="Developer">Master</option>
            <option value="Junior Developer">Professor</option>
            <option value="Senior Developer">Doctor of Science</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Academic Title"
            className="form-control"
            name="ac_title"
            value={ac_title}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Place of work"
            className="form-control"
            name="place_of_work"
            value={place_of_work}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Academic Activities"
            className="form-control"
            name="ac_activities"
            value={ac_activities}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="General Information"
            name="general_info"
            value={general_info}
            onChange={e => onChange(e)}
          ></textarea>
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
        <a className="btn btn-light my-1" href="#">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
