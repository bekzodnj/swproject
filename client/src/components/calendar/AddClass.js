import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MyCalendar from "./MyCalendar";
import { connect } from "react-redux";
import moment from "moment";
import { getEvents } from "../../actions/events";

const AddClass = ({ events, getEvents }) => {
  useEffect(() => {
    getEvents();
  }, []);

  const classes = events.map(el => (
    <article className="mw5 bg-white br3 pa4 mv2 ba b--black-10">
      <div className="">
        <h1 className="f3 mb2">{el.title}</h1>
        <h2 className="f5 fw4 gray mt0">
          {moment(el.start).format("MMMM Do")}
        </h2>
        <h2 className="f5 fw4 gray mt0">
          From: {moment(el.start).format("h:mm a")}
        </h2>
        <h2 className="f5 fw4 gray mt0">
          To: {moment(el.end).format("h:mm a")}
        </h2>
      </div>
    </article>
  ));
  return (
    <div>
      <Link className="btn" to="/dashboard">
        Go Back
      </Link>
      <h1 className="f4 fw3">Edit schedule</h1>
      <MyCalendar editable />

      <div className="bt pt3 mt3">{classes}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { getEvents }
)(AddClass);
