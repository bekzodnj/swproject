import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { getServices, deleteService } from '../../actions/services';

export const Services = ({ services, getServices, deleteService }) => {
  useEffect(() => {
    getServices();
  }, [getServices]);

  const handleDelete = (id) => {
    // let res = confirm("Are you sure?");
    deleteService(id);
  };
  return (
    <section>
      <div className='d-flex justify-content-between '>
        <h2>My Posts</h2>
        <Link to='/create-post' className='btn btn-primary pt-2'>
          Create a new post
        </Link>
      </div>

      <table className='table table-striped mt-3'>
        <thead>
          <tr>
            <th scope='col'>Service Title</th>
            <th scope='col'>Subject</th>
            <th scope='col'>Category</th>
            <th scope='col'>Status</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length !== 0 &&
            services.map((el) => (
              <tr key={el._id}>
                <td>Title</td>
                <td>Body</td>
                <td>Updated Date</td>
                <td>Is published:</td>
                <td>
                  <button className='btn btn-primary mr-2'>Edit</button>
                  <button
                    onClick={() => handleDelete(el._id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
});

export default connect(mapStateToProps, {
  getServices,
  deleteService,
})(Services);
