import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, createProfile } from "../../../../actions/profile";

//materialUI imports
import './index.module.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'

const ProfileForm = ({
  getCurrentProfile,
  createProfile,
  history,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [formData, setFormData] = useState({
    age: "0",
    gender: "",
    student: "",
    salary: "0",
    address: ""
  });

  const { age, gender, student, salary, address } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };


  return (
    <>
    { /* If user has not created a profile yet */ }
        <form className="profile-form" onSubmit={(e) => onSubmit(e)}>
        <div className="profile-form-group">
          <TextField
            type="text"
            placeholder="Enter age"
            name="age"
            value={age}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="profile-form-group">
          <TextField
            type="text"
            placeholder="Enter gender"
            name="gender"
            value={gender}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="profile-form-group">
          <TextField
            type='text'
            placeholder="Student ?"
            name="student"
            value={student}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="profile-form-group">
          <TextField
            type='text'
            placeholder="Enter salary"
            name="salary"
            value={salary}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="profile-form-group">
          <TextField
            type='text'
            placeholder="Enter Address"
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
          />
        </div>
        <Button type="submit" className="btn btn-primary" value="Create Profile" id='profile-form-button'>Enter</Button>
      </form>
    </>
  );
};

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth, //if user viewing profile has the same id as the profile being viewed, they should be able to edit
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(withRouter(ProfileForm));
