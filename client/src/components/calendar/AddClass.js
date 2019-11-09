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
      <Link className="btn btn-outline-secondary" to="/dashboard">
        &larr; Go Back
      </Link>
      <h1 className="display-5">Add new event</h1>

      <form>
        <div className="form-group">
          <label htmlFor="event_name">Enter event name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Event name"
            name="event-name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="logo">Upload Event logo (.jpg/.png)</label>
          <input
            type="file"
            className="form-control"
            placeholder="logo"
            name="logo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category of event</label>
          <select name="category" className="form-control">
            <option value="0">Choose category of the event...</option>
            <option value="consultation">Consultation</option>
            <option value="lecture">Lecture</option>
            <option value="seminar">Seminar</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type">Type of the event</label>
          <select name="type" className="form-control">
            <option value="0">Choose type of the event...</option>
            <option value="one-time">One-time</option>
            <option value="duplicate">Duplicate</option>
            <option value="both">Both</option>
          </select>
        </div>

        <p className="text-primary">
          Choose a suitable day from calendar &darr;
        </p>
        <MyCalendar editable />

        <div className="form-group mt-5">
          <label htmlFor="payment">Payment type</label>
          <select name="payment" className="form-control">
            <option value="0">Choose payment type...</option>
            <option value="prepaymnet">Prepayment Only</option>
            <option value="postpayment">Post payment</option>
            <option value="cashonly">Cash Only</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="min_number">Minimum number of participants</label>
          <input
            className="form-control"
            type="number"
            placeholder="Minimum number of participants"
            name="min_number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="max_number">Maximum number of participants</label>
          <input
            className="form-control"
            type="number"
            placeholder="Maximum number of participants"
            name="max_number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="repetitions">Number of repetitions</label>
          <input
            className="form-control"
            type="number"
            placeholder="Number of repetitions"
            name="repetitions"
          />
        </div>

        <div className="form-group">
          <label htmlFor="adress">Adress</label>
          <input
            type="text"
            className="form-control"
            placeholder="Adress of the event"
            name="adress"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cost">Cost</label>
          <input
            type="text"
            className="form-control"
            placeholder="Event cost"
            name="cost"
          />
        </div>

        <div className="form-group">
          <label htmlFor="valid_date">Valid from</label>
          <input
            type="date"
            className="form-control"
            placeholder="Valid from"
            name="valid_date"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiry_date">Expiry date</label>
          <input
            type="date"
            className="form-control"
            placeholder="Expiry date"
            name="expiry_date"
          />
        </div>

        <div className="form-group">
          <label htmlFor="brief_info">Brief information about the event</label>
          <input
            type="text"
            className="form-control"
            placeholder="Brief information"
            name="brief_info"
          />
        </div>

        <div className="form-group">
          <label htmlFor="detailed_info">Detailed info</label>
          <textarea
            className="form-control"
            placeholder="Detailed information"
            name="detailed_info"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="materials">Event materials</label>
          <input type="file" placeholder="Event materials" name="materials" />
        </div>

        <input type="submit" className="btn btn-primary" />
      </form>

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
