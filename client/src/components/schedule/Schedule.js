import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import MyCalendar from "../calendar/MyCalendar";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";

import { connect } from "react-redux";

import {
  getEvents,
  getNewEvents,
  updateNewEvents,
  updateEvents
} from "../../actions/events";

const Schedule = ({
  events,
  new_events,
  getEvents,
  updateEvents,
  getNewEvents,
  updateNewEvents,
  history
}) => {
  useEffect(() => {
    getEvents();
    getNewEvents();
  }, [getEvents]);

  // starting time for a calendar 8:00am morning
  const min_time = new Date();
  min_time.setHours(8);
  min_time.setMinutes(0);
  min_time.setSeconds(0);

  const localizer = momentLocalizer(moment);
  const onSubmit = e => {};
  const handleDateChange = () => {};

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [inputDay, setInputDay] = useState(1);

  //   let newEv = [];
  //   if (events !== undefined && events.length > 0) {
  //     newEv = events.map(el => ({
  //       ...el,
  //       start: new Date(el.start),
  //       end: new Date(el.end)
  //     }));
  //   } else {
  //     // newEv = [{ title: "Hello" }];
  //   }

  const newEv = [
    {
      start: startDate,
      end: endDate
    }
  ];

  let isRecurring = false;
  let start_next = moment(new Date()).add(1, "weeks");

  const onEventClick = e => {
    alert(e.start);
  };
  while(inputDay >=1){
      const pickers = (<div className="picker">
      <p>
        Start:
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </p>

      <p>
        End:{" "}
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </p>

      <hr />
    </div>);
  }

 /// console.log("Obj", start_next._d);
  return (
    <div>
      <Link className="btn btn-outline-secondary" to="/dashboard">
        &larr; Go Back
      </Link>
      <div>
        <div className="row">
          <div className="col-4" style={{ minHeight: "150px" }}>
            <div className="picker">
              <p>
                Start:
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </p>

              <p>
                End:{" "}
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </p>

              <hr />
            </div>

            <button
              className="btn btn-outline-info"
              onClick={() => setInputDay(inputDay + 1)}
            >
              +
            </button>
            {inputDay}
          </div>

          <div className="col-8">
            <div className="">
              <Calendar
                localizer={localizer}
                events={newEv}
                defaultView={"week"}
                defaultDate={new Date()}
                onSelectEvent={onEventClick}
                onSelectSlot={({ start, end }) => {
                  updateNewEvents(start, end);
                }}
                style={{ height: "400px" }}
                step={15}
                popup={true}
                min={min_time}
                dayLayoutAlgorithm={"no-overlap"}
              />
            </div>
          </div>
        </div>
      </div>

      <input type="submit" className="btn btn-primary mt-4" value="Submit" />
    </div>
  );
};

const mapStateToProps = state => ({
  events: state.events,
  new_events: state.new_events
});

export default connect(mapStateToProps, {
  getEvents,
  updateEvents,
  getNewEvents,
  updateNewEvents
})(withRouter(Schedule));
