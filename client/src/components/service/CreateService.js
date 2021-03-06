import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment-recur';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';

import { getServices, updateServices } from '../../actions/services';

const CreateService = ({ getServices, updateServices, history }) => {
  useEffect(() => {
    getServices();
  }, [getServices]);

  // local state for storing form data
  const [formData, setFormData] = useState({
    title: '',
    logo: '',
    subject: '',
    duration: '',
    category: '',
    min_no_of_students: 0,
    max_no_of_students: 0,
    address: '',
    cost: '',
    valid_from: '',
    expiry_date: '',
    info: '',
    detailed_info: '',
    no_of_weeks: 1,
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
    detailed_info,
    no_of_weeks,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();

    //console.log("New", new_events[0].start, new_events[0].end);
    //console.log(formData);

    updateServices(formData2, history);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  ///////////////////////////////
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
  const [isHidden, setIsHidden] = useState('');

  let newEv = [
    {
      start: startDate,
      end: endDate,
    },
    {
      start: startDate2,
      end: endDate2,
    },
    {
      start: startDate3,
      end: endDate3,
    },
    {
      start: startDate4,
      end: endDate4,
    },
    {
      start: startDate5,
      end: endDate5,
    },
    {
      start: startDate6,
      end: endDate6,
    },
    {
      start: startDate7,
      end: endDate7,
    },
  ];

  newEv = newEv.filter((el) => el.start !== null && el.end !== null);

  const onClickHandler = (e) => {
    // console.log(e.target.name);
    setIsHidden(e.target.name);
  };

  let isRecurring = false;
  let start_next = moment(new Date()).add(1, 'weeks');

  const onEventClick = (e) => {
    alert(e.start);
  };

  if (no_of_weeks > 1) {
    // for (let i = 0; i < newEv.length; i++) {
    //   for (let j = 1; j <= no_of_weeks; j++) {
    //     let start_next = moment(newEv[i].start).add(j, "weeks");
    //     let end_next = moment(newEv[i].end).add(j, "weeks");
    //     let newObj = {
    //       start: start_next,
    //       end: end_next
    //     };
    //     newEv = [...newEv, newObj];
    //   }
    // }
  }

  // console.log(newEv);

  const [isChecked, setIsChecked] = useState(true);
  //   console.log(isChecked);
  const events = [...newEv];

  let is_published = isChecked;
  const formData2 = {
    ...formData,
    is_published,
    events,
  };

  //   console.log(formData2);
  /////////////////////
  return (
    <div className='mb-5'>
      <Link className='btn btn-outline-secondary' to='/services'>
        &larr; Go Back
      </Link>
      <h1 className='display-5'>Create new service</h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='title'>Enter Service title</label>
              <input
                type='text'
                className='form-control'
                placeholder='Service name'
                name='title'
                value={title}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='category'>Category of event</label>
              <select
                name='category'
                className='form-control'
                onChange={(e) => onChange(e)}
                value={category}
              >
                <option value='0'>Choose category of the event...</option>
                <option value='consultation'>Consultation</option>
                <option value='lecture'>Lecture</option>
                <option value='seminar'>Seminar</option>
              </select>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='title'>Enter service subject</label>
              <input
                type='text'
                className='form-control'
                placeholder='Service subject'
                value={subject}
                name='subject'
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='title'>Number of weeks</label>
              <input
                type='number'
                className='form-control'
                placeholder='Number of weeks'
                value={no_of_weeks}
                name='no_of_weeks'
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='min_no_of_students'>
                Minimum number of participants
              </label>
              <input
                className='form-control'
                type='number'
                placeholder='Minimum'
                name='min_no_of_students'
                onChange={(e) => onChange(e)}
                value={min_no_of_students}
              />
            </div>
          </div>

          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='max_no_of_students'>
                Maximum number of participants
              </label>
              <input
                className='form-control'
                type='number'
                placeholder='Maximum'
                name='max_no_of_students'
                onChange={(e) => onChange(e)}
                value={max_no_of_students}
              />
            </div>
          </div>

          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='duration'>Expected duration (mins)</label>
              <input
                type='text'
                className='form-control'
                placeholder='Duration'
                name='duration'
                value={duration}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='info'>Brief information about the event</label>
          <input
            type='text'
            className='form-control'
            placeholder='Brief information'
            name='info'
            value={info}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='row'>
          <div className='col-md-3'>
            <div className='form-group'>
              <label htmlFor='valid_from'>Valid from</label>
              <input
                type='date'
                className='form-control'
                placeholder='Valid from'
                name='valid_from'
                value={valid_from}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className='col-md-3'>
            <div className='form-group'>
              <label htmlFor='expiry_date'>Expiry date</label>
              <input
                type='date'
                className='form-control'
                placeholder='Expiry date'
                name='expiry_date'
                onChange={(e) => onChange(e)}
                value={expiry_date}
              />
            </div>
          </div>

          <div className='col-md-3'>
            <div className='form-group'>
              <label htmlFor='cost'>Cost</label>
              <input
                type='text'
                className='form-control'
                placeholder='Event cost'
                name='cost'
                onChange={(e) => onChange(e)}
                value={cost}
              />
            </div>
          </div>

          <div className='col-md-3'>
            <div className='form-group'>
              <label htmlFor='logo'>Upload Event logo (.jpg/.png)</label>
              <input
                type='file'
                className='form-control'
                placeholder='logo'
                name='logo'
                value={logo}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            className='form-control'
            placeholder='Adress of the event'
            name='address'
            value={address}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='detailed_info'>Detailed info</label>
          <textarea
            className='form-control'
            placeholder='Detailed information'
            name='detailed_info'
            value={detailed_info}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        <div className='form-group'>
          <label htmlFor='materials'>Event materials</label>
          <input type='file' placeholder='Event materials' name='materials' />
        </div>

        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='1'
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            id='defaultCheck1'
          />
          <label className='form-check-label' htmlFor='defaultCheck1'>
            Publish to website?
          </label>
        </div>

        <input type='submit' className='btn btn-primary mt-4' value='Submit' />
      </form>

      <p className='text-primary my-2'>
        Choose a day(s) and time for this event &darr;
      </p>
      <div className='row my-2'>
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
                dateFormat='MMMM d, yyyy HH:mm'
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
                dateFormat='MMMM d, yyyy HH:mm'
              />
            </div>

            <hr />
          </div>

          {inputDay >= 2 && isShown2 && (
            <div className='picker'>
              <div>
                Start:
                <DatePicker
                  selected={startDate2}
                  placeholderText={'Please select start time'}
                  onChange={(date) => setStartDate2(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
              </div>

              <div>
                End:{' '}
                <DatePicker
                  selected={endDate2}
                  placeholderText={'Please select end time'}
                  onChange={(date) => setEndDate2(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
                <button
                  className='btn btn-sm btn-outline-danger ml-2'
                  name='btn2'
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
            <div className='picker'>
              <div>
                Start:
                <DatePicker
                  selected={startDate3}
                  placeholderText={'Please select start time'}
                  onChange={(date) => setStartDate3(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
              </div>

              <div>
                End:{' '}
                <DatePicker
                  selected={endDate3}
                  placeholderText={'Please select end time'}
                  onChange={(date) => setEndDate3(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
                <button
                  className='btn btn-sm btn-outline-danger ml-2'
                  name='btn3'
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
            <div className='picker'>
              <div>
                Start:
                <DatePicker
                  selected={startDate4}
                  placeholderText={'Please select start time'}
                  onChange={(date) => setStartDate4(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
              </div>

              <div>
                End:{' '}
                <DatePicker
                  selected={endDate4}
                  placeholderText={'Please select end time'}
                  onChange={(date) => setEndDate4(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
                <button
                  className='btn btn-sm btn-outline-danger ml-2'
                  name='btn4'
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
            <div className='picker'>
              <div>
                Start:
                <DatePicker
                  selected={startDate5}
                  placeholderText={'Please select start time'}
                  onChange={(date) => setStartDate5(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
              </div>

              <div>
                End:{' '}
                <DatePicker
                  selected={endDate5}
                  placeholderText={'Please select end time'}
                  onChange={(date) => setEndDate5(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
                <button
                  className='btn btn-sm btn-outline-danger ml-2'
                  name='btn5'
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
            <div className='picker'>
              <div>
                Start:
                <DatePicker
                  selected={startDate3}
                  placeholderText={'Please select start time'}
                  onChange={(date) => setStartDate6(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
              </div>

              <div>
                End:{' '}
                <DatePicker
                  selected={endDate6}
                  placeholderText={'Please select end time'}
                  onChange={(date) => setEndDate6(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
                <button
                  className='btn btn-sm btn-outline-danger ml-2'
                  name='btn6'
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
            <div className='picker'>
              <div>
                Start:
                <DatePicker
                  selected={startDate7}
                  placeholderText={'Please select start time'}
                  onChange={(date) => setStartDate7(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
              </div>

              <div>
                End:{' '}
                <DatePicker
                  selected={endDate7}
                  placeholderText={'Please select end time'}
                  onChange={(date) => setEndDate7(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy HH:mm'
                />
                <button
                  className='btn btn-sm btn-outline-danger ml-2'
                  name='btn7'
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
            className='btn btn-outline-info'
            onClick={() => {
              setInputDay(inputDay + 1);
              let a = '';
              a = inputDay == 2 ? setIsShown2(true) : '';
              a = inputDay == 3 ? setIsShown3(true) : '';
              a = inputDay == 4 ? setIsShown4(true) : '';
              a = inputDay == 5 ? setIsShown5(true) : '';
              a = inputDay == 6 ? setIsShown6(true) : '';
              a = inputDay == 7 ? setIsShown7(true) : '';
            }}
          >
            Add day +
          </button>
        </div>
        <div className='col-md-8 col-12'>
          <div className=''>
            <Calendar
              localizer={localizer}
              events={newEv}
              defaultView={'week'}
              defaultDate={new Date()}
              onSelectEvent={onEventClick}
              onSelectSlot={({ start, end }) => {
                // updateNewEvents(start, end);
              }}
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
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
});

export default connect(mapStateToProps, {
  getServices,
  updateServices,
})(withRouter(CreateService));
