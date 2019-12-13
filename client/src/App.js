import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import StudentLogin from "./components/student/StudentLogin";

import Recovery from "./components/auth/Recovery";
import Reset_Password from "./components/auth/Reset_Password";

import PrivateRoute from "./components/routing/PrivateRoute";

import Dashboard from "./components/dashboard/Dashboard";
import StudentDashboard from "./components/student/dashboard/StudentDashboard";

import CreateProfile from "./components/profile-forms/CreateProfile";
import StudentProfile from "./components/student/profile-forms/StudentProfile";

import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import AddClass from "./components/calendar/AddClass";
import EditClass from "./components/calendar/EditClass";
import EditEvent from "./components/calendar/EditEvent";
import Schedule from "./components/schedule/Schedule";
import Services from "./components/service/Services";
import CreateService from "./components/service/CreateService";

// import "./App.css";
// import "./bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "tachyons";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import StudentRegister from "./components/student/StudentRegister";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //run once, in the beginning
  // similar componentDidMount
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  document.body.classList.add("bg-light");
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/studentLogin" component={StudentLogin} />
              <Route
                exact
                path="/studentRegister"
                component={StudentRegister}
              />
              <Route exact path="/recovery" component={Recovery} />
              <Route exact path="/recovery/reset" component={Reset_Password} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />

              <PrivateRoute exact path="/schedule" component={Schedule} />
              <PrivateRoute exact path="/services" component={Services} />
              <PrivateRoute
                exact
                path="/create-service"
                component={CreateService}
              />

              <PrivateRoute
                exact
                path="/student-dashboard"
                component={StudentDashboard}
              />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/create-student-profile"
                component={StudentProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/add-class" component={AddClass} />
              <PrivateRoute
                exact
                path="/edit-class/:event_id"
                component={EditClass}
              />
              <PrivateRoute
                exact
                path="/editEvent/:event_id"
                component={EditEvent}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
