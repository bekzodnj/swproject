import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Stripe API
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Redux part
import { connect } from 'react-redux';
import { getEnrolled } from '../../../actions/services';

toast.configure();

export const Applications = ({ enrolled, getEnrolled }) => {
  useEffect(() => {
    getEnrolled();
  }, [getEnrolled]);

  const [course, setCourse] = React.useState({});

  const [product, setProduct] = React.useState({
    name: 'Tesla Roadster',
    price: 500,
    description: 'Cool car',
  });

  async function handleToken(token) {
    const response = await axios.post('/checkout', { token, product });
    const { status } = response.data;

    console.log('Response:', response.data);
    if (status === 'success') {
      toast('Success! Check email for details', { type: 'success' });
    } else {
      toast('Something went wrong', { type: 'error' });
    }
  }

  function handleOpen(idx) {
    setProduct({
      name: enrolled[idx].service.title,
      price: enrolled[idx].service.cost,
      description: enrolled[idx].service.info,
    });
  }

  if (enrolled !== undefined && enrolled.length !== 0) {
    // if (enrolled.service !== undefined) {
    // console.log(enrolled[2].service.title);
    //}
  }

  return (
    <section>
      <Link to='/student-dashboard'>Go Back</Link>
      <div className='d-flex justify-content-between '>
        <h2>My Applications</h2>
      </div>

      <table className='table table-striped mt-3'>
        <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Subject</th>
            <th scope='col'>Category</th>
            <th scope='col'>Status</th>
            <th scope='col'>Cost</th>
            <th scope='col'>Payment</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.length !== 0 &&
            enrolled !== undefined &&
            enrolled.map((el, idx) => (
              <tr key={el._id}>
                <td>{el.service.title}</td>
                <td>{el.service.subject}</td>
                <td>{el.service.category}</td>
                <td>
                  {el.is_approved ? (
                    <span className='badge badge-success'>Approved</span>
                  ) : (
                    <span className='badge badge-secondary'>Pending</span>
                  )}
                </td>
                <td>{'$' + el.service.cost}</td>
                <td>
                  {el.is_approved ? (
                    <StripeCheckout
                      stripeKey='pk_test_A4VaJeX43tYiN1IlReEPln7k00PIOgmm1x'
                      token={handleToken}
                      amount={el.service.cost * 100}
                      name={el.service.title}
                      opened={() => handleOpen(idx)}
                    />
                  ) : (
                    <span className=''>Not available</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

Applications.propTypes = {
  getEnrolled: PropTypes.func.isRequired,
  enrolled: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  enrolled: state.enrolled,
});

export default connect(mapStateToProps, {
  getEnrolled,
})(Applications);
