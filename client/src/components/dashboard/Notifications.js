import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  getEnrolledTeacher,
  getEnrolledApprove,
  getEnrolledReject
} from "../../actions/services";

export const Notifications = ({
  enrolled,
  getEnrolledTeacher,
  getEnrolledApprove,
  getEnrolledReject
}) => {
  useEffect(() => {
    getEnrolledTeacher();
  }, [getEnrolledTeacher]);

  //collect from enroll list who is not approved, nor deleted
  let enrolls;
  if (enrolled.length !== 0 && enrolled !== null) {
    enrolls = enrolled.filter(el => el.is_approved !== true);
  } else {
    enrolls = [];
  }

  const acceptHandle = id => {
    getEnrolledApprove(id);
  };

  const rejectHandle = id => {
    getEnrolledReject(id);
  };

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
        {enrolls === undefined ? (
          <Fragment>It seems notification box is empty</Fragment>
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
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => acceptHandle(`${el._id}`)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => rejectHandle(`${el._id}`)}
                    >
                      Reject
                    </button>
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
  getEnrolledTeacher,
  getEnrolledApprove,
  getEnrolledReject
})(Notifications);
