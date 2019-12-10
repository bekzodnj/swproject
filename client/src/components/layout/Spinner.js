import React, { Fragment } from "react";
import Spinner from "react-bootstrap/Spinner";

export default () => {
  return (
    <Fragment>
      <div>Loading... </div>
      <Spinner animation="border" variant="primary" />
    </Fragment>
  );
};
