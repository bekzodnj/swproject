import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

const Experience = ({ experience }) => {
  const experiences = experience.map(el => (
    <tr key={el._id}>
      <td>{el.company}</td>

      <td className="">{el.title}</td>
      <td className="">
        <Moment format="YYYY/MM/DD">{el.from}</Moment> -
        {el.to === null ? " Now" : <Moment format="YYYY/MM/DD">{el.to}</Moment>}
      </td>
      <td className="btn btn-danger">Danger</td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Info</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default Experience;
