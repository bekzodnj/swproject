import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

export const TeacherInfo = ({ match }) => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      `/api/users/teacher/${match.params.teacher_id}`
    );
    console.log(res.data);

    setFormData(res.data);
  };

  const [formData, setFormData] = React.useState({});
  return (
    <section>
      {formData !== null && (
        <div className="row">
          <div className="col-md-6 mb-4">
            <ul className="list-group mb-3">
              <li className="list-group-item lh-condensed d-flex justify-content-center">
                <div>
                  <img
                    className="br-100"
                    width="100"
                    height="100"
                    src="https://www.laserfiche.com/wp-content/uploads/2016/04/programmer-849858410-rs.jpg"
                  />
                </div>
              </li>
              <li className="list-group-item lh-condensed">
                <div>
                  <h6 className="my-1 text-bold">Teacher Name</h6>
                  <p className="text-secondary">
                    {formData.name} {formData.lastname}
                  </p>
                </div>
              </li>

              <li className="list-group-item lh-condensed">
                <div>
                  <h6 className="my-1 text-bold">Academic Title</h6>
                  <p className="text-secondary"> {formData.ac_title}</p>
                </div>
              </li>

              <li className="list-group-item lh-condensed">
                <div>
                  <h6 className="my-1 text-bold">Academic Activities</h6>
                  <p className="text-secondary"> {formData.ac_activities}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-md-6 mb-4">
            <ul className="list-group mb-3">
              <li className="list-group-item lh-condensed">
                <div>
                  <h6 className="my-1 text-bold">Phone</h6>
                  <p className="text-secondary">{formData.phone}</p>
                </div>
              </li>

              <li className="list-group-item lh-condensed">
                <div>
                  <h6 className="my-1 text-bold">Email</h6>
                  <p className="text-secondary">chris.martin1234@yahoo.com </p>
                </div>
              </li>
              <li className="list-group-item lh-condensed">
                <div>
                  <h6 className="my-1 text-bold">Genral Info</h6>
                  <p className="text-secondary"> {formData.bio}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(TeacherInfo);
