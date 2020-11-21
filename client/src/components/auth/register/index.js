import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { register } from "../../../actions/auth";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

//materialUI imports
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
import './index.css'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
      console.log("Register Component success");
    }
  };

  if (isAuthenticated) {
    //Redirect to dashboard if logged in
    return <Redirect to="dashboard" />;
  }
  return (
    <Paper elevation={7} className='register-container'>
    <>
    <div className='register-headers'>
    <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
    </div>

      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <TextField
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <TextField
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <TextField
            type="password"
            placeholder="Password"
            name="password"
            minLength="4"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <TextField
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="4"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <Button type="submit" className="btn btn-primary" value="Register" id='register-button'>Enter</Button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { register })(Register);
