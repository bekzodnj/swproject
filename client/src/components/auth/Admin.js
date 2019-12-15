import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

export const Admin = ({}) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#f1c254";
  }, []);

  //collect from enroll list who is not approved, nor deleted

  return (
    <section>
      <div className="d-flex justify-content-between ">
        <h2>My Admin</h2>
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
        <tbody></tbody>
      </table>
    </section>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Admin);
