import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../../actions/student/profile";

import Spinner from "../../layout/Spinner";
import DashboardActions from "../../dashboard/DashboardActions";
import MyCalendar from "../../calendar/MyCalendar";

const StudentDashboard = ({
  getCurrentProfile,
  // auth: { user },
  // profile: { profile, loading },
  auth,
  profile,
  history
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return auth.loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="f2">Dashboard Student</h1>
      <div className="lead">
        <div className="">
          {/* {profile != null && (
            <img
              src={profile.user.avatar}
              className="br-100 pa1 ba b--black-10 h3 w3"
              alt="avatar"
            />
          )} */}
        </div>
      </div>

      {profile !== null ? (
        <Fragment>
          <span className="f2 fw1 mt2">Welcome, {profile.name}</span>
          <DashboardActions />
          <div className="f2 lh-title fw1 mt4 bt pt4">Your schedule</div>

          <MyCalendar
            editable={false}
            onEventClick={event => history.push(`/edit-class/${event._id}`)}
          />

          <div className="mt4 bb pt4"></div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-student-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

StudentDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.student_profile.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(
  StudentDashboard
);
