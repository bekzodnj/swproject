import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Stripe API
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import 'react-toastify/dist/ReactToastify.css';

// Redux part
import { connect } from 'react-redux';
import { getEnrolled } from '../../../actions/services';

toast.configure();

require('dotenv').config();

export const Applications = ({ enrolled, getEnrolled }) => {
  useEffect(() => {
    getEnrolled();
  }, [getEnrolled]);

  // PayPal options
  const initialOptions = {
    'client-id': process.env.REACT_APP_PAYPAL,
    currency: 'USD',
    intent: 'capture',
    'data-client-token': 'abc123xyz==',
  };

  // test stripe
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

  function setActiveProduct(idx) {
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

  /*
    PayPal settings
   */
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState('');

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              // charge users $200 per order
              value: 40,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // handles when a payment is confirmed for paypal
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setBillingDetails(payer);
      setSucceeded(true);
    });
  };
  // handles payment errors
  const onError = (data, actions) => {
    setPaypalErrorMessage('Something went wrong with your payment');
  };

  return (
    <section>
      <Link to='/student-dashboard'>Go Back</Link>
      <div className='d-flex justify-content-between '>
        <h2>My Applications </h2>
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
          {enrolled &&
            enrolled.length &&
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
                <td>{el.service.cost + ' EUR'}</td>
                <td>
                  {el.is_approved ? (
                    <PayPalScriptProvider options={{ 'client-id': 'test' }}>
                      <PayPalButtons
                        style={{
                          color: 'blue',
                          shape: 'pill',
                          label: 'pay',
                          tagline: false,
                          layout: 'horizontal',
                        }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                      />
                    </PayPalScriptProvider>
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
