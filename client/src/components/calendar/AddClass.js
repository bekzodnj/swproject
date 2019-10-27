import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MyCalendar from "./MyCalendar";
import { connect } from "react-redux";
import { getEvents, updateEvents } from "../../actions/events";
import PropTypes from "prop-types";

const AddClass = ({ events, getEvents, updateEvents }) => {
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <Link className="btn" to="/dashboard">
        Go Back
      </Link>
      <MyCalendar editable />
    </div>
  );
};

AddClass.propTypes = {
  getEvents: PropTypes.func.isRequired,
  updateEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { getEvents, updateEvents }
)(AddClass);
