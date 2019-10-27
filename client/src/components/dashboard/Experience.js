import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(el => (
    <tr key={el._id}>
      <td>{el.company}</td>

      <td className="">{el.title}</td>
      <td className="">
        <Moment format="YYYY/MM/DD">{el.from}</Moment> -
        {el.to === null ? " Now" : <Moment format="YYYY/MM/DD">{el.to}</Moment>}
      </td>
      <td className="btn btn-danger" onClick={() => deleteExperience(el._id)}>
        Delete
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <div className="f4 lh-title fw1 mt4 mb0">Your Personal Information:</div>
      <h2 className="mt0">Experience Info</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
