import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { getAllServices } from '../../../actions/services';

export const CourseList = ({ services, getAllServices }) => {
  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  // const mdColors = [
  //   "#F44336",
  //   "#FFEBEE",
  //   "#FFCDD2",
  //   "#EF9A9A",
  //   "#E57373",
  //   "#EF5350",
  //   "#F44336",
  //   "#E53935",
  //   "#D32F2F",
  //   "#C62828",
  //   "#B71C1C",
  //   "#FF8A80",
  //   "#FF5252",
  //   "#FF1744",
  //   "#D50000",
  //   "#E91E63",
  //   "#FCE4EC",
  //   "#F8BBD0",
  //   "#F48FB1",
  //   "#F06292"
  // ];

  let services2 = services.filter((el) => el.is_published);

  return (
    <section>
      <div className='d-flex justify-content-between '>
        <h2>All Available Services</h2>
      </div>

      <div className='row'>
        {services2.length !== 0 &&
          services2.map((el, idx) => (
            <div key={idx} className='col-12 col-md-4'>
              <div
                className='card m-2'
                style={{ minHeight: '250px', borderTop: '5px solid #748acd' }}
              >
                <div className='card-body'>
                  <h5 className='card-title'>{el.title}</h5>
                  <hr />
                  <p className='card-text'>Subject: {el.subject}</p>
                  <p className='card-text'>Category: {el.category}</p>
                  <p className='card-text text-muted'>
                    Info:{' '}
                    {el.info.length > 70
                      ? el.info.slice(0, 70) + '...'
                      : el.info}
                  </p>

                  <Link to={`/services/${el._id}`} className='btn btn-primary'>
                    More
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
});

export default connect(mapStateToProps, {
  getAllServices,
})(CourseList);
