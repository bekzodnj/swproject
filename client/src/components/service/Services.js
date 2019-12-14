import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { getServices } from "../../actions/services";

export const Services = ({ services, getServices }) => {
  useEffect(() => {
    getServices();
  }, [getServices]);

  console.log(services);

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
                  <span className="badge badge-success">Published</span>
                </td>
                <td>
                  <button className="btn btn-outline-primary mr-2">Edit</button>
                  <button className="btn btn-outline-danger">Delete</button>
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
  getServices
})(Services);
