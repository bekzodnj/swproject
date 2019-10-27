import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MyCalendar from "./MyCalendar";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddClass = ({ events, getEvents, updateEvents }) => {
  const classes = events.map(el => <h2>{el.title}</h2>);
  return (
    <div>
      <Link className="btn" to="/dashboard">
        Go Back
      </Link>
      <MyCalendar editable />

      <div className="bt pt3 mt3">{classes}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(AddClass);
