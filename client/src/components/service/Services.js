import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
export const Services = () => {
  return (
    <div className="row">
      <div className="header">
        <h2>My Services</h2>
        <Link to="/create-service" className="btn btn-primary">
          Create a new service
        </Link>
      </div>
    </div>
  );
};

export default Services;
