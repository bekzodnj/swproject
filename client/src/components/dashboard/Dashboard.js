import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "../dashboard/DashboardActions";
import Experience from "../dashboard/Experience";
import Education from "../dashboard/Education";
import MyCalendar from "../calendar/MyCalendar";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="f2">Dashboard Teacher</h1>
      <div className="lead">
        <div className="">
          {profile != null && (
            <img
              src={profile.user.avatar}
              className="br-100 pa1 ba b--black-10 h3 w3"
              alt="avatar"
            />
          )}
        </div>

        <span className="f2 fw1 mt2">Welcome, {user && user.name}</span>
      </div>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className="f2 lh-title fw1 mt4 bt pt4">Your schedule</div>
          <MyCalendar editable={false} />
          <div className="mt4 bb pt4"></div>
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>
              Delete my account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
