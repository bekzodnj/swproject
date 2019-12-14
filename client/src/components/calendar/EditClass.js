import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import MyCalendar from "./MyCalendar";
import { connect } from "react-redux";
import moment from "moment";
import {
  getEvents,
  getNewEvents,
  updateNewEvents,
  updateEvents,
  editEvents,
  deleteEvent
} from "../../actions/events";

const EditClass = ({
  events,
  new_events,
  getEvents,
  updateEvents,
  getNewEvents,
  updateNewEvents,
  editEvents,
  deleteEvent,
  history,
  match
}) => {
  // local state for storing form data
  const [formData, setFormData] = useState({
    title: "",
    logo: "",
    category: "",
    payment_type: "",
    min_no_of_students: 1,
    max_no_of_students: 2,
    event_type: "",
    no_of_repetitions: 1,
    address: "",
    cost: 0,
    valid_from: "",
    expiry_date: "",
    info: "",
    detailed_info: ""
  });

  const event_id = match.params.event_id;

  let event = {};
  if (events !== undefined && events.length > 0) {
    const selectedEvent = events.filter(el => el._id == event_id);
    // console.log(selectedEvent[0]);
    event = { ...selectedEvent[0] };
  } else {
  }

  useEffect(() => {
    getEvents();
    getNewEvents();

    setFormData({
      title: !event.title ? "" : event.title,
      logo: !event.logo ? "" : event.logo,
      category: !event.category ? "" : event.category,
      payment_type: !event.payment_type ? "" : event.payment_type,
      no_of_repetitions: !event.no_of_repetitions ? 1 : event.no_of_repetitions,
      address: !event.address ? "" : event.address,
      cost: !event.cost ? 0 : event.cost,
      valid_from: !event.valid_from ? "" : event.valid_from,
      expiry_date: !event.expiry_date ? "" : event.expiry_date,
      info: !event.info ? "" : event.info,
      detailed_info: !event.detailed_info ? "" : event.detailed_info,
      min_no_of_students: !event.min_no_of_students
        ? 1
        : event.min_no_of_students,
      max_no_of_students: !event.max_no_of_students
        ? 2
        : event.max_no_of_students
    });
  }, [getEvents, getNewEvents]);

  const {
    title,
    logo,
    category,
    payment_type,
    min_no_of_students,
    max_no_of_students,
    event_type,
    no_of_repetitions,
    address,
    cost,
    valid_from,
    expiry_date,
    info,
    detailed_info
  } = formData;

  const onSubmit = e => {
    e.preventDefault();

    //console.log("New", new_events[0].start, new_events[0].end);
    //console.log(formData);
    let start, end;
    if (new_events !== undefined && new_events.length > 0) {
      start = new_events[0].start;
      end = new_events[0].end;
    } else {
      start = null;
      end = null;
    }

    const formData1 = {
      ...formData,
      start,
      end
    };
    editEvents(formData1, event_id, history);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const classes = new_events.map(el => (
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
      <Link className="btn btn-outline-secondary" to="/dashboard">
        &larr; Go Back
      </Link>
      <div className="d-flex justify-content-between">
        <h1 className="display-5">Edit Event: </h1>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            const reply = window.confirm("Are you sure?");

            if (reply) deleteEvent(event_id, history);
          }}
        >
          Delete Event &times;
        </button>
      </div>

      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="title">Enter event name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Event name"
            name="title"
            onChange={e => onChange(e)}
            value={title}
          />
        </div>

        <div className="form-group">
          <label htmlFor="logo">Upload Event logo (.jpg/.png)</label>
          <input
            type="file"
            className="form-control"
            placeholder="logo"
            name="logo"
            onChange={e => onChange(e)}
            value={logo}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category of event</label>
          <select
            name="category"
            className="form-control"
            onChange={e => onChange(e)}
            value={category}
          >
            <option value="0">Choose category of the event...</option>
            <option value="consultation">Consultation</option>
            <option value="lecture">Lecture</option>
            <option value="seminar">Seminar</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="event_type">Type of the event</label>
          <select
            name="event_type"
            className="form-control"
            onChange={e => onChange(e)}
            value={event_type}
          >
            <option value="0">Choose type of the event...</option>
            <option value="one-time">One-time</option>
            <option value="duplicate">Duplicate</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div className="form-group mt-5">
          <label htmlFor="payment_type">Payment type</label>
          <select
            name="payment_type"
            className="form-control"
            onChange={e => onChange(e)}
            value={payment_type}
          >
            <option value="0">Choose payment type...</option>
            <option value="prepayment">Prepayment Only</option>
            <option value="postpayment">Post payment</option>
            <option value="cashonly">Cash Only</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="min_no_of_students">
            Minimum number of participants
          </label>
          <input
            className="form-control"
            type="number"
            placeholder="Minimum number of participants"
            name="min_no_of_students"
            onChange={e => onChange(e)}
            value={min_no_of_students}
          />
        </div>

        <div className="form-group">
          <label htmlFor="max_no_of_students">
            Maximum number of participants
          </label>
          <input
            className="form-control"
            type="number"
            placeholder="Maximum number of participants"
            name="max_no_of_students"
            onChange={e => onChange(e)}
            value={max_no_of_students}
          />
        </div>

        <div className="form-group">
          <label htmlFor="no_of_repetitions">Number of repetitions</label>
          <input
            className="form-control"
            type="number"
            placeholder="Number of repetitions"
            name="no_of_repetitions"
            onChange={e => onChange(e)}
            value={no_of_repetitions}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Adress of the event"
            name="address"
            onChange={e => onChange(e)}
            value={address}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cost">Cost</label>
          <input
            type="text"
            className="form-control"
            placeholder="Event cost"
            name="cost"
            onChange={e => onChange(e)}
            value={cost}
          />
        </div>

        <div className="form-group">
          <label htmlFor="valid_from">Valid from</label>
          <input
            type="date"
            className="form-control"
            placeholder="Valid from"
            name="valid_from"
            onChange={e => onChange(e)}
            value={valid_from}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiry_date">Expiry date</label>
          <input
            type="date"
            className="form-control"
            placeholder="Expiry date"
            name="expiry_date"
            onChange={e => onChange(e)}
            value={expiry_date}
          />
        </div>

        <div className="form-group">
          <label htmlFor="info">Brief information about the event</label>
          <input
            type="text"
            className="form-control"
            placeholder="Brief information"
            name="info"
            onChange={e => onChange(e)}
            value={info}
          />
        </div>

        <div className="form-group">
          <label htmlFor="detailed_info">Detailed info</label>
          <textarea
            className="form-control"
            placeholder="Detailed information"
            name="detailed_info"
            onChange={e => onChange(e)}
            value={detailed_info}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="materials">Event materials</label>
          <input type="file" placeholder="Event materials" name="materials" />
        </div>

        <p className="text-primary">
          Choose a suitable day from calendar &darr;
        </p>

        <MyCalendar editable />

        <h2 className="mt2">Preview</h2>
        <div className="bt pt3 mt3">{classes}</div>

        <input type="submit" className="btn btn-primary mt-4" value="Save" />
      </form>
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
  updateNewEvents,
  editEvents,
  deleteEvent
})(withRouter(EditClass));
