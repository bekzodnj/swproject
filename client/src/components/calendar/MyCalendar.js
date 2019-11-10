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

  let newObj = {};
  let arr = [];
  // if (events === undefined || events.length == 0) {
  // } else {
  //   const { title, start, end } = events[0];

  let newEv = [];

  if (events !== undefined && events.length > 0) {
    // console.log(events[0]);
    // var mydate = new Date(events[0].start);
    // console.log("mydate", mydate.toDateString());

    newEv = [
      {
        ...events[0],
        start: new Date(events[0].start),
        end: new Date(events[0].end)
      }
    ];
  }

  // newEv = [
  //   {
  //     id: 6,
  //     title: "Meeting",
  //     start: new Date(2019, 11, 12, 10, 30, 0, 0),
  //     end: new Date(2019, 11, 12, 12, 30, 0, 0),
  //     desc: "Pre-meeting meeting, to prepare for the meeting"
  //   }
  // ];
  return (
    <div className="mt4">
      {events != undefined && events.length > 0 && (
        <Calendar
          selectable={editable}
          localizer={localizer}
          events={newEv}
          defaultView={"week"}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.title)}
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
