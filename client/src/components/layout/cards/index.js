import React, { useEffect, useState } from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import './index.css'
import { getCurrentProfile, createProfile } from "../../../actions/profile";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const Dashboard = ({ getCurrentProfile,  profile: { profile, loading },}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

return (

  <>

{profile === undefined || (profile && profile.transactions.length === 0) ?

<div id='dashboard-timeline-container'>

<h1>You still have some work to do!</h1>

<Timeline align="alternate" id='dashboard-timeline'>
      <TimelineItem>
        <TimelineSeparator>
        <TimelineDot id = {profile ? 'complete' : 'incomplete'}/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><p>Create your profile</p></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot id = {(profile && profile.transactions.length  > 0 )? 'complete' : 'incomplete'}  />
        </TimelineSeparator>
        <TimelineContent><p>Start recording transactions</p></TimelineContent>
      </TimelineItem>
    </Timeline>

    <h2>Just a few of our trackable categories</h2>


        <div class="container flex">
            <div class="card">
                <h4>Food</h4>
                <img src="https://cdn.pixabay.com/photo/2016/10/23/16/04/splash-1763305__340.png" alt=""></img>
            </div>
            <div class="card">
                <h4>Auto</h4>
                <img src="https://cdn.pixabay.com/photo/2016/10/23/16/04/splash-1763305__340.png" alt=""></img>
              </div>
              <div class="card">
                <h4>Home</h4>
                <img src="https://cdn.pixabay.com/photo/2016/10/23/16/04/splash-1763305__340.png" alt=""></img>
              </div>
              <div class="card">
                <h4>Utilities</h4>
                <img src="https://cdn.pixabay.com/photo/2016/10/23/16/04/splash-1763305__340.png" alt=""></img>
              </div>
              <div class="card">
                <h4>Travel</h4>
                <img src="https://cdn.pixabay.com/photo/2016/10/23/16/04/splash-1763305__340.png" alt=""></img>
              </div>
              <div class="card">
                <h4>Outing</h4>
                <img src="https://cdn.pixabay.com/photo/2016/10/23/16/04/splash-1763305__340.png" alt=""></img>
              </div>
              <div class="card">
                <h4>Clojure</h4>
                <img src="https://cdn.pixabay.com/photo/2016/10/23/16/04/splash-1763305__340.png" alt=""></img>
              </div>
        </div>
    
    </div>
    
    : 
  <p>you have a profile</p>
}

  </>


);

}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth, //if user viewing profile has the same id as the profile being viewed, they should be able to edit
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(withRouter(Dashboard));