import React, { useEffect, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { connect } from "react-redux";
import {
  getEvents,
  getNewEvents,
  updateEvents,
  updateNewEvents
} from "../../actions/events";

import PropTypes from "prop-types";

const MyCalendar = ({
  events,
  new_events,
  updateEvents,
  updateNewEvents,
  getEvents,
  editable = false
}) => {
  useEffect(() => {
    getEvents();
    getNewEvents();
  }, []);

  // handleSelect = ({ start, end }) => {
  //   const title = window.prompt("New Event name");
  //   if (title)
  //     this.setState({
  //       events: [
  //         ...this.state.events,
  //         {
  //           start,
  //           end,
  //           title
  //         }
  //       ]
  //     });
  // };

  const localizer = momentLocalizer(moment);

  // starting time for a calendar 8:00am morning
  const min_time = new Date();
  min_time.setHours(8);
  min_time.setMinutes(0);
  min_time.setSeconds(0);

  // in db dates stored as strings
  // converted each date property: start, end
  // to the js date object
  // in order to make them work in calendar
  let newEv = [];
  if (events !== undefined && events.length > 0) {
    newEv = events.map(el => ({
      ...el,
      start: new Date(el.start),
      end: new Date(el.end)
    }));
  }

  return (
    <div className="mt4">
      {events != undefined && events.length > 0 && (
        <Calendar
          selectable={editable}
          localizer={localizer}
          events={newEv}
          defaultView={"week"}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event._id)}
          onSelectSlot={({ start, end }) => {
            updateNewEvents(start, end);
          }}
          style={{ height: "400px" }}
          step={15}
          popup={true}
          min={min_time}
          dayLayoutAlgorithm={"no-overlap"}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  events: state.events,
  new_events: state.new_events
});

export default connect(
  mapStateToProps,
  { getEvents, updateEvents, getNewEvents, updateNewEvents }
)(MyCalendar);
