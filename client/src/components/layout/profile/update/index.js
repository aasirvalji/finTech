import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../../actions/profile";

const EditProfile = ({
  profile: { profile, loading }, //destructure profile substate
  createProfile, //createProfile action is used to create profile as well as edit profile
  getCurrentProfile, //action to get users current profile to prefill fields
  history, //router history stack
}) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    student: "",
    salary: "",
    address: "",
  });

  useEffect(() => {
    getCurrentProfile(); //gets current data for pre filled fields

    setFormData({
      age: loading || !profile.age ? "" : profile.age,
      gender: loading || !profile.gender ? "" : profile.gender,
      student: loading || !profile.student ? "" : profile.student,
      salary: loading || !profile.salary ? "" : profile.salary,
      address: loading || !profile.address ? "" : profile.address.join(",")
    });
  }, [loading, getCurrentProfile]);

  const {
    age,
    gender,
    student,
    salary,
    address,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
            <div className="form-group">
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={age}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
