import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { getCurrentProfile } from '../../../actions/student/profile';

import Spinner from '../../layout/Spinner';

import { getEnrolled } from '../../../actions/services';

import { Calendar, Views, momentLocalizer } from 'react-big-calendar';

import 'moment-recur';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';

const StudentDashboard = ({
  getCurrentProfile,
  // auth: { user },
  // profile: { profile, loading },
  auth,
  profile,
  history,
  enrolled,
  getEnrolled,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getEnrolled();
  }, [getCurrentProfile, getEnrolled]);

  let newday;
  if (profile !== null) {
    var myDateObj = new Date(profile.date_of_birth);
    var now = moment(myDateObj);
    newday = moment(now).format('MMMM Do YYYY');
  }

  const localizer = momentLocalizer(moment);

  const min_time = new Date();
  min_time.setHours(8);
  min_time.setMinutes(0);
  min_time.setSeconds(0);

  let newEv;
  newEv = enrolled.filter((el) => el.is_approved);
  let events = [];
  if (newEv !== undefined && newEv.length > 0) {
    events = [...newEv[0].service.events];
    //console.log("events", events);
    events = events.map((el) => ({
      ...el,
      start: new Date(el.start),
      end: new Date(el.end),
    }));
  } else {
  }

  console.log(enrolled);

  return auth.loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null ? (
        <Fragment>
          <div className='row'>
            <div className='col-md-6 mb-4'>
              <ul className='list-group mb-3'>
                <li className='list-group-item lh-condensed d-flex justify-content-center'>
                  <div>
                    <img
                      className='rounded br-100 border p-2'
                      width='100'
                      height='100'
                      src='https://images.vexels.com/media/users/3/153708/isolated/preview/93ff71fae04deba3cc47c7aafb4a1dcc-graduation-hat-flat-icon-by-vexels.png'
                    />
                  </div>
                </li>
                <li className='list-group-item lh-condensed'>
                  <div>
                    <h6 className='my-1 text-bold'>Student Name</h6>
                    <p className='text-secondary'>
                      {profile.name} {profile.lastname}
                    </p>
                  </div>
                </li>

                <li className='list-group-item lh-condensed'>
                  <div>
                    <h6 className='my-1 text-bold'>Date of birth</h6>
                    <p className='text-secondary'> {newday}</p>
                  </div>
                </li>

                <li className='list-group-item lh-condensed'>
                  <div>
                    <h6 className='my-1 text-bold'>Place of study</h6>
                    <p className='text-secondary'> {profile.place_of_study}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className='col-md-6 mb-4'>
              <ul className='list-group mb-3'>
                <li className='list-group-item lh-condensed'>
                  <div>
                    <h6 className='my-1 text-bold'>Student type</h6>
                    <p className='text-secondary'>{profile.type}</p>
                  </div>
                </li>

                <li className='list-group-item lh-condensed'>
                  <div>
                    <h6 className='my-1 text-bold'>Preffered Language</h6>
                    <p className='text-secondary'> {profile.preferred_lang}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className=''>
            <Calendar
              localizer={localizer}
              events={events}
              defaultView={'week'}
              defaultDate={new Date()}
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

          <div className='mt4 bb pt4'></div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-student-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

StudentDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.student_profile.profile,
  enrolled: state.enrolled,
});

export default connect(mapStateToProps, { getCurrentProfile, getEnrolled })(
  StudentDashboard
);
