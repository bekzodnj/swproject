import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import moment from "moment";
import {
  getEvents,
  getNewEvents,
  updateNewEvents,
  updateEvents
} from "../../actions/events";

const CreateService = ({
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

  // local state for storing form data
  const [formData, setFormData] = useState({
    title: "",
    logo: "",
    subject: "",
    duration: "",
    category: "",
    min_no_of_students: 0,
    max_no_of_students: 20,
    address: "",
    cost: "",
    valid_from: "",
    expiry_date: "",
    info: "",
    detailed_info: ""
  });

  const {
    title,
    logo,
    subject,
    duration,
    category,
    min_no_of_students,
    max_no_of_students,
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

    updateEvents(formData, new_events[0].start, new_events[0].end, history);
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
      <Link className="btn btn-outline-secondary" to="/services">
        &larr; Go Back
      </Link>
      <h1 className="display-5">Create new service</h1>

      <form onSubmit={e => onSubmit(e)}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="title">Enter Service title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Service name"
                name="title"
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="title">Enter service subject</label>
              <input
                type="text"
                className="form-control"
                placeholder="Service subject"
                name="subject"
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="category">Category of event</label>
              <select
                name="category"
                className="form-control"
                onChange={e => onChange(e)}
              >
                <option value="0">Choose category of the event...</option>
                <option value="consultation">Consultation</option>
                <option value="lecture">Lecture</option>
                <option value="seminar">Seminar</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="min_no_of_students">
                Minimum number of participants
              </label>
              <input
                className="form-control"
                type="number"
                placeholder="Minimum"
                name="min_no_of_students"
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="max_no_of_students">
                Maximum number of participants
              </label>
              <input
                className="form-control"
                type="number"
                placeholder="Maximum"
                name="max_no_of_students"
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="duration">Expected duration (mins)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Duration"
                name="duration"
                onChange={e => onChange(e)}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="info">Brief information about the event</label>
          <input
            type="text"
            className="form-control"
            placeholder="Brief information"
            name="info"
            onChange={e => onChange(e)}
          />
        </div>

        {/* <div className="row">
            <div className="col-md-3">
                
            </div>
        </div> */}

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="valid_from">Valid from</label>
              <input
                type="date"
                className="form-control"
                placeholder="Valid from"
                name="valid_from"
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="expiry_date">Expiry date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Expiry date"
                name="expiry_date"
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="cost">Cost</label>
              <input
                type="text"
                className="form-control"
                placeholder="Event cost"
                name="cost"
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="logo">Upload Event logo (.jpg/.png)</label>
              <input
                type="file"
                className="form-control"
                placeholder="logo"
                name="logo"
                onChange={e => onChange(e)}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Adress of the event"
            name="address"
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="detailed_info">Detailed info</label>
          <textarea
            className="form-control"
            placeholder="Detailed information"
            name="detailed_info"
            onChange={e => onChange(e)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="materials">Event materials</label>
          <input type="file" placeholder="Event materials" name="materials" />
        </div>

        <p className="text-primary">
          Choose a suitable day from calendar &darr;
        </p>

        <input type="submit" className="btn btn-primary mt-4" value="Submit" />
      </form>
      <h2 className="mt2">Preview</h2>
      <div className="bt pt3 mt3">{classes}</div>
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
})(withRouter(CreateService));
