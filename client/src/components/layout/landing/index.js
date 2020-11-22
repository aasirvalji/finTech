import React, { useEffect } from 'react'
import './index.css'
import truck from '../../../img/truck.png'
import alanBtn from '@alan-ai/alan-sdk-web';
import { Redirect, withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import tree from '../../../img/tree.png'
import Fade from 'react-reveal/Fade';

import { connect } from "react-redux";
import PropTypes from "prop-types";


const Landing = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    //Redirect to dashboard if logged in
    return <Redirect to="/dashboard" />;
  }

    return (
      <section class="showcase">

        <div class="firstGrid">
            <h2>Welcome to ManageIT, The App That Will Manage All Your Financial Needs</h2>
        </div>
        <div class="secondGrid">
            <p> For people in need of wealth management, from people who once needed wealth management. 
            ManageIT allows you to manage your money in a way that you are living your optimal life in the present
             day, and for years to come. Create a free account to get started today.
            </p>
        </div>
    </section>
    )
}

Landing.propTypes = {
  //login and isAuthenticated props are checked here
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { })(withRouter(Landing));
