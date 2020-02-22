import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      lastname: loading || !profile.lastname ? "" : profile.lastname,
      phone: loading || !profile.phone ? "" : profile.phone,
      date_of_birth:
        loading || !profile.date_of_birth ? "" : profile.date_of_birth,
      ac_degree: loading || !profile.ac_degree ? "" : profile.ac_degree,
      ac_title: loading || !profile.ac_title ? "" : profile.ac_title,
      place_of_work:
        loading || !profile.place_of_work ? "" : profile.place_of_work,
      bio: loading || !profile.bio ? "" : profile.bio,
      ac_activities:
        loading || !profile.ac_activities ? "" : profile.ac_activities,
      ac_works: loading || !profile.ac_works ? "" : profile.ac_works,
      general_info:
        loading || !profile.general_info ? "" : profile.general_info,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  const {
    lastname,
    phone,
    date_of_birth,
    ac_degree,
    ac_title,
    place_of_work,
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
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <Link className="btn btn-outline-secondary" to="/services">
        &larr; Go Back
      </Link>

      <h2 className="h2">Update Profile</h2>
      <small>* = required field</small>

      <form className="form mb-4" onSubmit={e => onSubmit(e)}>
        <div className="row">
          <div className="col-12 col-md-6">
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
              <label>Upload profile photo</label>
              <input
                type="file"
                placeholder="Profile photo"
                className="form-control"
                name="profile_photo"
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
          </div>

          <div className="col-12 col-md-6">
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
                className="form-control"
                value={bio}
                onChange={e => onChange(e)}
              ></textarea>
              <small className="form-text">
                Tell us a little about yourself
              </small>
            </div>

            <div className="form-group">
              <textarea
                placeholder="General Information"
                name="general_info"
                className="form-control"
                value={general_info}
                onChange={e => onChange(e)}
              ></textarea>
            </div>

            <div className="my-2">
              <button
                type="button"
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                className="btn btn-outline-primary"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    value={instagram}
                    onChange={e => onChange(e)}
                  />
                </div>
              </Fragment>
            )}
          </div>

          <input
            type="submit"
            className="btn btn-primary my-1"
            value="Submit"
          />
          <a className="btn btn-light my-1" href="#">
            Go Back
          </a>
        </div>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
