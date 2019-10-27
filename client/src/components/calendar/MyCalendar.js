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
          // addEvents([...events, { title: "hello", start, end }]);
        }}
        style={{ height: "400px" }}
        step={15}
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
