import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = props => {
  return (
    <div>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>

        <Link to="/add-class" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add New Event
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
