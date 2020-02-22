import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { getAllTeachers } from "../../../actions/auth";

export const ViewTeachers = ({ teachers, getAllTeachers }) => {
  useEffect(() => {
    getAllTeachers();
  }, [getAllTeachers]);

  return (
    <section>
      <div className="d-flex justify-content-between ">
        <h2>All teachers</h2>
      </div>

      <div className="row">
        {teachers.length !== 0 &&
          teachers.map(el => (
            <div className="col-12 col-md-4">
              <div class="card m-2" style={{ minHeight: "120px" }}>
                <div class="card-body">
                  <h5 class="card-title" style={{ height: "15px" }}>
                    Teacher
                  </h5>
                  <hr />
                  <p class="card-text text-muted">Name: {el.name}</p>
                  <p class="card-text text-muted">Email: {el.email}</p>

                  <Link to={`/view-teachers/${el._id}`} class="btn btn-primary">
                    More
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  teachers: state.teachers
});

export default connect(mapStateToProps, {
  getAllTeachers
})(ViewTeachers);
