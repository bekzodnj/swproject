import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { getServices, deleteService } from "../../actions/services";

export const Services = ({ services, getServices, deleteService }) => {
  useEffect(() => {
    getServices();
  }, [getServices]);

  const handleDelete = id => {
    // let res = confirm("Are you sure?");

    deleteService(id);
  };
  return (
    <section>
      <div className="d-flex justify-content-between ">
        <h2>My Services</h2>
        <Link to="/create-service" className="btn btn-primary pt-2">
          Create a new service
        </Link>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Service Title</th>
            <th scope="col">Subject</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length !== 0 &&
            services.map(el => (
              <tr key={el._id}>
                <td>{el.title}</td>
                <td>{el.subject}</td>
                <td>{el.category}</td>
                <td>
                  {el.is_published ? (
                    <span className="badge badge-success">Published</span>
                  ) : (
                    <span className="badge badge-secondary">Hidden</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-primary mr-2">Edit</button>
                  <button
                    onClick={() => handleDelete(el._id)}
                    className="btn btn-danger"
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

const mapStateToProps = state => ({
  services: state.services
});

export default connect(mapStateToProps, {
  getServices,
  deleteService
})(Services);
