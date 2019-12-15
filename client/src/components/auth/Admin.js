import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

import { getAllTeachers } from "../../actions/auth";

export const Admin = ({ getAllTeachers, teachers }) => {
  useEffect(() => {
    getAllTeachers();
  }, [getAllTeachers]);


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
            <th scope="col">Activate / Deactivate</th>
          </tr>
        </thead>
        <tbody>
           {teachers !== undefined && teachers.length > 0 && teachers.map(el=>(
             <tr>
            
             <td>{el.name}</td>
             <td>{el.email}</td>
             <td>
               <Form.Check
                 type="switch"
                 id="custom-switch"
                 label="Click to change"
                 onClick={()=>handleChange(el._id)}
               />
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

export default connect(mapStateToProps, { getAllTeachers })(Admin);
