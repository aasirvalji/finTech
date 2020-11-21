import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, createProfile } from "../../../actions/profile";

//materialUI imports
import './index.module.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'

const Profile = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    createProfile(email, password);
  };


  return (
    <>
    { /* If user has not created a profile yet */ }
      {!profile && <>
        <form className="profile-form" onSubmit={(e) => onSubmit(e)}>
        <div className="profile-form-group">
          <TextField
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="profile-form-group">
          <TextField
            type="password"
            placeholder="Password"
            name="password"
            minLength="4"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <Button type="submit" className="btn btn-primary" value="Login" id='profile-form-button'>Enter</Button>
      </form>
      </>}
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth, //if user viewing profile has the same id as the profile being viewed, they should be able to edit
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(Profile);
