import React, { useEffect, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { connect } from "react-redux";
import { getEvents, updateEvents } from "../../actions/events";

import PropTypes from "prop-types";

const MyCalendar = ({ events1, updateEvents, getEvents, editable = false }) => {
  const [events, addEvents] = useState([]);

  useEffect(() => {
    getEvents();
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

  // starting time for a calendar 8:00am morning
  const max_time = new Date();
  max_time.setHours(22);
  max_time.setMinutes(0);
  max_time.setSeconds(0);

  return (
    <div className="mt4">
      <Calendar
        selectable={editable}
        localizer={localizer}
        events={events1}
        defaultView={"week"}
        defaultDate={new Date()}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={({ start, end }) => {
          updateEvents(start, end);
        }}
        style={{ height: "400px" }}
        step={15}
        popup={true}
        min={min_time}
        dayLayoutAlgorithm={"no-overlap"}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  events1: state.events
});

export default connect(
  mapStateToProps,
  { getEvents, updateEvents }
)(MyCalendar);
