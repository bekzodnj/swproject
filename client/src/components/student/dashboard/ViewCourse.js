import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { Calendar, Views, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'moment-recur';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  getAllServices,
  createEnrolled,
  getEnrolled,
} from '../../../actions/services';

import { getTeacherSchedule } from '../../../actions/schedule';
export const ViewCourse = ({
  history,
  services,
  user,
  getAllServices,
  getEnrolled,
  createEnrolled,
  getTeacherSchedule,
  match,
}) => {
  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  const course_id = match.params.service_id;
  const service = services.filter((el) => el._id === course_id);

  if (service[0] !== undefined) getTeacherSchedule(service[0].user);

  //for Modal
  const [show, setShow] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handeApply = () => {
    const formData = {
      teacher: service[0].user,
      student: user._id,
      service: service[0]._id,
      is_approved: false,
    };

    createEnrolled(formData, history);

    //console.log(formData);
  };

  const localizer = momentLocalizer(moment);

  const min_time = new Date();
  min_time.setHours(8);
  min_time.setMinutes(0);
  min_time.setSeconds(0);

  let newEv = [];
  let events = [];
  if (service[0] !== undefined) {
    // events = [...newEv[0].service.events];
    //console.log("events", events);
    if (service[0].events !== undefined) {
      events = service[0].events.map((el) => ({
        ...el,
        start: new Date(el.start),
        end: new Date(el.end),
      }));
    }
  } else {
  }

  return (
    <section>
      <Link class='btn btn-outline-info my-1' to='/course-list'>
        &larr; Back to services
      </Link>

      {service[0] !== undefined && (
        <div className='parent'>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{ height: '60px' }} closeButton>
              <Modal.Title>Please confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Short Notes for Teacher
              <input className='form-control' placeholder='Type here'></input>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={handeApply}>
                Apply!
              </Button>
            </Modal.Footer>
          </Modal>

          <h4 className='d-flex justify-content-between align-items-center mb-3'>
            <span className='text-muted'>{service[0].title}</span>
            <Button variant='primary' onClick={handleShow}>
              Apply
            </Button>
          </h4>
          <div className='row'>
            <div className='col-md-6 mb-4'>
              <ul className='list-group mb-3'>
                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>Service subject</h6>
                    <small className='text-muted'>
                      Which subject does it related
                    </small>
                  </div>
                  <span className='text-muted'>{service[0].subject}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>Service title</h6>
                  </div>
                  <span className='text-muted'>{service[0].title}</span>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>Category</h6>
                  </div>
                  <span className='text-muted'>{service[0].category}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>Duration</h6>
                    <small className='text-muted'>In minutes</small>
                  </div>
                  <span className='text-muted'>{service[0].duration}</span>
                </li>
              </ul>
            </div>

            <div className='col-md-6 mb-4'>
              <ul className='list-group mb-3'>
                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>Min number of students</h6>
                  </div>
                  <span className='text-muted'>
                    {service[0].min_no_of_students}
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>Max number of students</h6>
                  </div>
                  <span className='text-muted'>
                    {service[0].max_no_of_students}
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>Cost (in euros)</h6>
                  </div>
                  <span className='text-muted'>{service[0].cost}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>Short Info</h6>
                  </div>
                  <span className='text-muted'>{service[0].info}</span>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>Number of weeks</h6>
                  </div>
                  <span className='text-muted'>{service[0].no_of_weeks}</span>
                </li>
              </ul>
            </div>

            <div className='mt4 bb pt4'></div>
          </div>
        </div>
      )}
      {
        //if category is Lecture we just show the schedule
      }
      {service[0] !== undefined && service[0].category !== 'consultation' && (
        <div className=''>
          <Calendar
            localizer={localizer}
            events={events}
            defaultView={'week'}
            defaultDate={events[0].start}
            onSelectEvent={() => {}}
            onSelectSlot={({ start, end }) => {
              // updateNewEvents(start, end);
            }}
            style={{ height: '400px' }}
            step={15}
            popup={true}
            min={min_time}
          />
        </div>
      )}
      {service[0] !== undefined && service[0].category === 'consultation' && (
        <div className='row'>
          <div className='col-md-4 col-12' style={{ minHeight: '150px' }}>
            <div className='picker'>
              <div>
                Start:
                <DatePicker
                  localizer
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  placeholderText={'Please select start time'}
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy hh:mm aa'
                />
              </div>

              <div>
                End:{' '}
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText={'Please select end time'}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy hh:mm aa'
                />
              </div>

              <hr />
            </div>
          </div>

          <div className='col-md-8 col-12'>
            <div className=''>
              <Calendar
                localizer={localizer}
                events={newEv}
                defaultView={'week'}
                defaultDate={new Date()}
                style={{ height: '400px' }}
                step={15}
                popup={true}
                min={min_time}
                dayLayoutAlgorithm={'no-overlap'}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getAllServices,
  createEnrolled,
  getEnrolled,
  getTeacherSchedule,
})(withRouter(ViewCourse));
