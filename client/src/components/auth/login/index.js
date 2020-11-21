import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../actions/auth";

//materialUI imports
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
import './index.css'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    //Redirect to dashboard if logged in
    return <Redirect to="/dashboard" />;
  }
  return (
    <Paper elevation={7} className='login-container'>
    <>
    <div className='login-headers'>
    <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
    </div>

      <form className="login-form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <TextField
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
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
        <Button type="submit" className="btn btn-primary" value="Login" id='login-button'>Enter</Button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  </Paper>
  );
};

Login.propTypes = {
  //login and isAuthenticated props are checked here
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
