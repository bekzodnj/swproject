import React, { useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { connect } from "react-redux";
import { getEvents, updateEvents } from "../../actions/events";

import PropTypes from "prop-types";

class MyCalendar extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { events: [] };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title
          }
        ]
      });
    console.log(start, end);
    updateEvents(start, end);
  };
  render() {
    const { events1, getEvents, updateEvents } = this.props;

    const localizer = momentLocalizer(moment);
    console.log(this.state.events);
    return (
      <div className="mt4">
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={"week"}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          style={{ height: "400px" }}
          step={15}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events1: state.events
});

export default connect(
  mapStateToProps,
  { getEvents, updateEvents }
)(MyCalendar);
