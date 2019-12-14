import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { getAllServices } from "../../../actions/services";

export const CourseList = ({ services, getAllServices }) => {
  useEffect(() => {
    getAllServices();
  }, [getAllServices]);
  // const mdColors = [
  //   "#F44336",
  //   "#FFEBEE",
  //   "#FFCDD2",
  //   "#EF9A9A",
  //   "#E57373",
  //   "#EF5350",
  //   "#F44336",
  //   "#E53935",
  //   "#D32F2F",
  //   "#C62828",
  //   "#B71C1C",
  //   "#FF8A80",
  //   "#FF5252",
  //   "#FF1744",
  //   "#D50000",
  //   "#E91E63",
  //   "#FCE4EC",
  //   "#F8BBD0",
  //   "#F48FB1",
  //   "#F06292"
  // ];

  let services2 = services.filter(el => el.is_published);

  return (
    <section>
      <div className="d-flex justify-content-between ">
        <h2>All Available Services</h2>
      </div>

      <div className="row">
        {services2.length !== 0 &&
          services2.map(el => (
            <div className="col-12 col-md-4">
              <div class="card" style={{ minHeight: "250px" }}>
                <div class="card-body">
                  <h5 class="card-title" style={{ height: "27px" }}>
                    {el.title}
                  </h5>
                  <hr />
                  <p class="card-text text-muted" style={{ height: "110px" }}>
                    {el.info}
                  </p>
                  <Link to={`/services/${el._id}`} class="btn btn-primary">
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
  services: state.services
});

export default connect(mapStateToProps, {
  getAllServices
})(CourseList);
