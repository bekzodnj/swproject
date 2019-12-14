import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { getEnrolled } from "../../../actions/services";

export const Applications = ({ enrolled, getEnrolled }) => {
  useEffect(() => {
    getEnrolled();
  }, [getEnrolled]);

  return (
    <section>
      <Link to="/student-dashboard">Go Back</Link>
      <div className="d-flex justify-content-between ">
        <h2>My Applications</h2>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Subject</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.length !== 0 &&
            enrolled.map(el => (
              <tr key={el._id}>
                <td>{el.service.title}</td>
                <td>{el.service.subject}</td>
                <td>{el.service.category}</td>
                <td>
                  {el.is_approved ? (
                    <span className="badge badge-success">Approved</span>
                  ) : (
                    <span className="badge badge-secondary">Pending</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

const mapStateToProps = state => ({
  enrolled: state.enrolled
});

export default connect(mapStateToProps, {
  getEnrolled
})(Applications);
