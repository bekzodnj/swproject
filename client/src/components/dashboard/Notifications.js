import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { getEnrolledTeacher } from "../../actions/services";

export const Notifications = ({ enrolled, getEnrolledTeacher }) => {
  useEffect(() => {
    getEnrolledTeacher();
  }, [getEnrolledTeacher]);

  let enrolls;
  if (enrolled.length !== 0) {
    enrolls = enrolled.filter(el => el.is_approved !== true);
  }
  console.log(enrolls);
  return (
    <section>
      <div className="d-flex justify-content-between ">
        <h2>My Notifications</h2>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Subject</th>
            <th scope="col">Student ID:</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {enrolls == undefined ? (
          <p>Loading</p>
        ) : (
          <tbody>
            {enrolls.length !== 0 &&
              enrolls !== undefined &&
              enrolls.map(el => (
                <tr key={el._id}>
                  <td>{el.service.title}</td>
                  <td>{el.service.subject}</td>
                  <td>
                    <Link to={`/student/${el.student}`}>{el.student}</Link>
                  </td>
                  <td>
                    <button className="btn btn-primary mr-2">Accept</button>
                    <button className="btn btn-danger mr-2">Reject</button>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </section>
  );
};

const mapStateToProps = state => ({
  enrolled: state.enrolled
});

export default connect(mapStateToProps, {
  getEnrolledTeacher
})(Notifications);
