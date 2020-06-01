import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal, Alert } from 'react-bootstrap';

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
  schedule,

  getAllServices,
  getEnrolled,
  createEnrolled,
  getTeacherSchedule,
  match,
}) => {
  useEffect(() => {
    if (service[0] !== undefined) getTeacherSchedule(service[0].user);
    getAllServices();
  }, [getAllServices, getTeacherSchedule]);

  const course_id = match.params.service_id;
  const service = services.filter((el) => el._id === course_id);
  //console.log(schedule.working_times);

  //for Modal
  const [show, setShow] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isScheduleErrorShown, setIsScheduleErrorShown] = useState(false);

  const handeApply = () => {
    const formData = {
      teacher: service[0].user,
      student: user._id,
      service: service[0]._id,
      is_approved: false,
      requestedDates: {
        start: startDate,
        end: endDate,
      },
    };

    console.log(formData);
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

  let newSchedule = [];
  if (schedule.working_times !== undefined) {
    newSchedule = schedule.working_times.map((el) => ({
      ...el,
      start: new Date(el.start),
      end: new Date(el.end),
    }));

    //console.log(newSchedule);
  }

  let isStartMatches = false;
  let isEndMatches = false;
  const handleStart = (startTime) => {
    if (newSchedule.length > 0) {
      isStartMatches = newSchedule.some((item) => item.start <= startTime);
    }
    isStartMatches
      ? setIsScheduleErrorShown(true)
      : setIsScheduleErrorShown(false);

    setStartDate(startTime);
    //console.log(isStartMatches);
  };
  const handleEnd = (endTime) => {
    if (newSchedule.length > 0) {
      isEndMatches = newSchedule.some((item) => item.end >= endTime);
    }
    isEndMatches
      ? setIsScheduleErrorShown(true)
      : setIsScheduleErrorShown(false);

    setEndDate(endTime);
    //console.log(isEndMatches);
  };

  return (
    <section>
      <Link class='btn btn-outline-info my-1' to='/course-list'>
        &larr; Back to services
      </Link>

      {service[0] !== undefined && (
        <div className='parent mb-4'>
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
        <div>
          <h1 className='display-4'>Please request a day for consultation</h1>
          <div className='row'>
            <div className='col-md-4 col-12'>
              <div className='picker'>
                <Alert variant='primary'>
                  Choose time according to teacher's schedule on the right
                </Alert>
                <div className='mb-2'>
                  Start:
                  <DatePicker
                    localizer
                    selected={startDate}
                    onChange={(date) => handleStart(date)}
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
                    onChange={(date) => handleEnd(date)}
                    placeholderText={'Please select end time'}
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={15}
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy hh:mm aa'
                  />
                </div>

                <hr />
                {!isScheduleErrorShown && (
                  <Alert variant='danger'>
                    Choose matching time with teacher's schedule
                  </Alert>
                )}
                <Button variant='primary' onClick={handleShow} size='lg'>
                  Apply
                </Button>
              </div>
            </div>

            <div className='col-md-8 col-12'>
              <div className=''>
                <p>Teacher's schedule</p>
                <Calendar
                  localizer={localizer}
                  events={newSchedule}
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
        </div>
      )}

      <div style={{ height: '200px' }}></div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
  user: state.auth.user,
  schedule: state.schedule,
});

export default connect(mapStateToProps, {
  getAllServices,
  createEnrolled,
  getEnrolled,
  getTeacherSchedule,
})(withRouter(ViewCourse));
