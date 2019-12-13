import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
export const Services = () => {
  return (
    <div className="d-flex justify-content-between">
      <h2>My Services</h2>
      <Link to="/create-service" className="btn btn-primary pt-2">
        Create a new service
      </Link>
    </div>
  );
};

export default Services;
