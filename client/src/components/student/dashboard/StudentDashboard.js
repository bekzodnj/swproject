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
      {profile !== null ? (
        <Fragment>
          <div className="row">
            <div className="col-md-6 mb-4">
              <ul className="list-group mb-3">
                <li className="list-group-item lh-condensed">
                  <div>
                    <h6 className="my-1 text-bold">Student Name</h6>
                    <p className="text-secondary">Bekzodjon Norkuziev</p>
                  </div>
                </li>

                <li className="list-group-item lh-condensed">
                  <div>
                    <h6 className="my-1 text-bold">Date of birth</h6>
                    <p className="text-secondary"> 1998 March</p>
                  </div>
                </li>

                <li className="list-group-item lh-condensed">
                  <div>
                    <h6 className="my-1 text-bold">Place of study</h6>
                    <p className="text-secondary"> Harvard University</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
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
