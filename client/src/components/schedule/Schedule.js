import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment-recur";
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
  }, [getEvents, getNewEvents]);

  // starting time for a calendar 8:00am morning
  const min_time = new Date();
  min_time.setHours(8);
  min_time.setMinutes(0);
  min_time.setSeconds(0);

  const localizer = momentLocalizer(moment);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startDate2, setStartDate2] = useState(null);
  const [endDate2, setEndDate2] = useState(null);
  const [isShown2, setIsShown2] = useState(false);

  const [startDate3, setStartDate3] = useState(null);
  const [endDate3, setEndDate3] = useState(null);
  const [isShown3, setIsShown3] = useState(false);

  const [startDate4, setStartDate4] = useState(null);
  const [endDate4, setEndDate4] = useState(null);
  const [isShown4, setIsShown4] = useState(false);

  const [startDate5, setStartDate5] = useState(null);
  const [endDate5, setEndDate5] = useState(null);
  const [isShown5, setIsShown5] = useState(false);

  const [startDate6, setStartDate6] = useState(null);
  const [endDate6, setEndDate6] = useState(null);
  const [isShown6, setIsShown6] = useState(false);

  const [startDate7, setStartDate7] = useState(null);
  const [endDate7, setEndDate7] = useState(null);
  const [isShown7, setIsShown7] = useState(false);

  const [inputDay, setInputDay] = useState(2);
  const [isHidden, setIsHidden] = useState("");

  let newEv = [
    {
      start: startDate,
      end: endDate
    },
    {
      start: startDate2,
      end: endDate2
    },
    {
      start: startDate3,
      end: endDate3
    },
    {
      start: startDate4,
      end: endDate4
    },
    {
      start: startDate5,
      end: endDate5
    },
    {
      start: startDate6,
      end: endDate6
    },
    {
      start: startDate7,
      end: endDate7
    }
  ];

  newEv = newEv.filter(el => el.start !== null && el.end !== null);

  const onClickHandler = e => {
    // console.log(e.target.name);
    setIsHidden(e.target.name);
  };

  let isRecurring = false;
  let start_next = moment(new Date()).add(1, "weeks");

  const onEventClick = e => {
    alert(e.start);
  };

  // console.log(start_next);

  /// console.log("Obj", start_next._d);
  return (
    <div>
      <Link className="btn btn-outline-secondary mb-2" to="/dashboard">
        &larr; Go Back
      </Link>
      <div>
        <p className="lead text-secondary">
          Select working hours and it appears in your calendar
        </p>
        <div className="row">
          <div className="col-md-4 col-12" style={{ minHeight: "150px" }}>
            <div className="picker">
              <div>
                Start:
                <DatePicker
                  localizer
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  showTimeSelect
                  placeholderText={"Please select start time"}
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm"
                />
              </div>

              <div>
                End:{" "}
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  placeholderText={"Please select end time"}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm"
                />
              </div>

              <hr />
            </div>

            {inputDay >= 2 && isShown2 && (
              <div className="picker">
                <div>
                  Start:
                  <DatePicker
                    selected={startDate2}
                    placeholderText={"Please select start time"}
                    onChange={date => setStartDate2(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                </div>

                <div>
                  End:{" "}
                  <DatePicker
                    selected={endDate2}
                    placeholderText={"Please select end time"}
                    onChange={date => setEndDate2(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                  <button
                    className="btn btn-sm btn-outline-danger ml-2"
                    name="btn2"
                    onClick={() => {
                      setIsShown2(false);
                      setStartDate2(null);
                      setEndDate2(null);
                      setInputDay(inputDay - 1);
                    }}
                  >
                    &times;
                  </button>
                </div>

                <hr />
              </div>
            )}

            {inputDay >= 3 && isShown3 && (
              <div className="picker">
                <div>
                  Start:
                  <DatePicker
                    selected={startDate3}
                    placeholderText={"Please select start time"}
                    onChange={date => setStartDate3(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                </div>

                <div>
                  End:{" "}
                  <DatePicker
                    selected={endDate3}
                    placeholderText={"Please select end time"}
                    onChange={date => setEndDate3(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                  <button
                    className="btn btn-sm btn-outline-danger ml-2"
                    name="btn3"
                    onClick={() => {
                      setIsShown3(false);
                      setStartDate3(null);
                      setEndDate3(null);
                      setInputDay(inputDay - 1);
                    }}
                  >
                    &times;
                  </button>
                </div>

                <hr />
              </div>
            )}

            {inputDay >= 4 && isShown4 && (
              <div className="picker">
                <div>
                  Start:
                  <DatePicker
                    selected={startDate4}
                    placeholderText={"Please select start time"}
                    onChange={date => setStartDate4(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                </div>

                <div>
                  End:{" "}
                  <DatePicker
                    selected={endDate4}
                    placeholderText={"Please select end time"}
                    onChange={date => setEndDate4(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                  <button
                    className="btn btn-sm btn-outline-danger ml-2"
                    name="btn4"
                    onClick={() => {
                      setIsShown4(false);
                      setStartDate4(null);
                      setEndDate4(null);
                      setInputDay(inputDay - 1);
                    }}
                  >
                    &times;
                  </button>
                </div>

                <hr />
              </div>
            )}

            {inputDay >= 5 && isShown5 && (
              <div className="picker">
                <div>
                  Start:
                  <DatePicker
                    selected={startDate5}
                    placeholderText={"Please select start time"}
                    onChange={date => setStartDate5(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                </div>

                <div>
                  End:{" "}
                  <DatePicker
                    selected={endDate5}
                    placeholderText={"Please select end time"}
                    onChange={date => setEndDate5(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                  <button
                    className="btn btn-sm btn-outline-danger ml-2"
                    name="btn5"
                    onClick={() => {
                      setIsShown5(false);
                      setStartDate5(null);
                      setEndDate5(null);
                      setInputDay(inputDay - 1);
                    }}
                  >
                    &times;
                  </button>
                </div>

                <hr />
              </div>
            )}

            {inputDay >= 6 && isShown6 && (
              <div className="picker">
                <div>
                  Start:
                  <DatePicker
                    selected={startDate3}
                    placeholderText={"Please select start time"}
                    onChange={date => setStartDate6(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                </div>

                <div>
                  End:{" "}
                  <DatePicker
                    selected={endDate6}
                    placeholderText={"Please select end time"}
                    onChange={date => setEndDate6(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                  <button
                    className="btn btn-sm btn-outline-danger ml-2"
                    name="btn6"
                    onClick={() => {
                      setIsShown6(false);
                      setStartDate6(null);
                      setEndDate6(null);
                      setInputDay(inputDay - 1);
                    }}
                  >
                    &times;
                  </button>
                </div>

                <hr />
              </div>
            )}

            {inputDay >= 7 && isShown7 && (
              <div className="picker">
                <div>
                  Start:
                  <DatePicker
                    selected={startDate7}
                    placeholderText={"Please select start time"}
                    onChange={date => setStartDate7(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                </div>

                <div>
                  End:{" "}
                  <DatePicker
                    selected={endDate7}
                    placeholderText={"Please select end time"}
                    onChange={date => setEndDate7(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                  <button
                    className="btn btn-sm btn-outline-danger ml-2"
                    name="btn7"
                    onClick={() => {
                      setIsShown7(false);
                      setStartDate7(null);
                      setEndDate7(null);
                      setInputDay(inputDay - 1);
                    }}
                  >
                    &times;
                  </button>
                </div>

                <hr />
              </div>
            )}

            <button
              className="btn btn-outline-info"
              onClick={() => {
                setInputDay(inputDay + 1);
                let a = "";
                a = inputDay == 2 ? setIsShown2(true) : "";
                a = inputDay == 3 ? setIsShown3(true) : "";
                a = inputDay == 4 ? setIsShown4(true) : "";
                a = inputDay == 5 ? setIsShown5(true) : "";
                a = inputDay == 6 ? setIsShown6(true) : "";
                a = inputDay == 7 ? setIsShown7(true) : "";
              }}
            >
              Add day +
            </button>
          </div>

          <div className="col-md-8 col-12">
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

      <button
        className="btn btn-primary my-3"
        onClick={() => console.log(newEv)}
      >
        Save
      </button>
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
