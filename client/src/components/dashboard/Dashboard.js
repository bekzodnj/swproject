import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "../dashboard/DashboardActions";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment-recur";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";

import { getEnrolledTeacher } from "../../actions/services";

const Dashboard = ({
  enrolled,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  getEnrolledTeacher
}) => {
  useEffect(() => {
    getCurrentProfile();
    getEnrolledTeacher();
  }, [getCurrentProfile, getEnrolledTeacher]);

  const localizer = momentLocalizer(moment);

  const min_time = new Date();
  min_time.setHours(8);
  min_time.setMinutes(0);
  min_time.setSeconds(0);

  const onEventClick = e => {
    alert(e.start);
  };

  //1st variant, enter only first entry of array
  let newEv;
  newEv = enrolled.filter(el => el.is_approved);
  let events = [];
  if (newEv !== undefined && newEv.length > 0) {
    events = [...newEv[0].service.events];
    //console.log("events", events);
    events = events.map(el => ({
      ...el,
      start: new Date(el.start),
      end: new Date(el.end)
    }));
  } else {
  }

  // 2nd variant
  // let newEv;
  // newEv = enrolled.filter(el => el.is_approved);
  // let events = [];
  // if (newEv !== undefined && newEv.length > 0) {
  //   events = newEv.map(el => el.service.events);

  //   events = events.map(el => ({
  //     ...el,
  //     start: new Date(el.start),
  //     end: new Date(el.end)
  //   }));

  //   console.log("New: ", events);
  // } else {
  // }

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h3 className="">Welcome, {user && user.name}</h3>
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
      </div>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <h4 className="">Your schedule</h4>

          <div className="">
            <Calendar
              localizer={localizer}
              events={events}
              defaultView={"week"}
              defaultDate={new Date()}
              onSelectEvent={onEventClick}
              onSelectSlot={({ start, end }) => {
                // updateNewEvents(start, end);
              }}
              style={{ height: "400px" }}
              step={15}
              popup={true}
              min={min_time}
            />
          </div>

          <div className="mt4 bb pt4"></div>
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  enrolled: state.enrolled
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getEnrolledTeacher
})(Dashboard);
