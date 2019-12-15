import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  getAllTeachers,
  activateTeacher,
  deactivateTeacher
} from "../../actions/auth";

export const Admin = ({
  getAllTeachers,
  activateTeacher,
  deactivateTeacher,
  teachers
}) => {
  useEffect(() => {
    getAllTeachers();
  }, [getAllTeachers]);

  const handleActivate = id => {
    activateTeacher(id);
  };

  const handleDeactivate = id => {
    deactivateTeacher(id);
  };
  return (
    <section>
      <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">
        <img
          className="mr-3 br-100"
          src="https://ih1.redbubble.net/image.738129631.6518/flat,800x800,070,f.jpg"
          alt=""
          width="48"
          height="48"
        />
        <div className="lh-100">
          <h6 className="mb-0 text-white lh-100">Admin</h6>
          <small>Manage the teacher accounts</small>
        </div>
      </div>

      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Activate / Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {teachers !== undefined &&
            teachers.length > 0 &&
            teachers.map(el => (
              <tr>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>
                  {el.is_teacher ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-secondary">Not active</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-success mr-2"
                    onClick={() => handleActivate(el._id)}
                  >
                    Activate
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDeactivate(el._id)}
                  >
                    Deactivate
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
  teachers: state.teachers
});

export default connect(mapStateToProps, {
  getAllTeachers,
  activateTeacher,
  deactivateTeacher
})(Admin);
