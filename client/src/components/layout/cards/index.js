import React, { useEffect, useState } from 'react';
import { Button, Grid, Grow, Typography } from '@material-ui/core';
import './index.css'
import { getCurrentProfile, createProfile } from "../../../actions/profile";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Chart from '../charts/main'
import axios from 'axios';
import Slider from '../slider'

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const bucketRoot = 'https://my-aws-bucket-90091.s3.amazonaws.com/'

const Dashboard = ({ getCurrentProfile,  profile: { profile, loading }, auth: {user}}) => {
  const [recomendations, setRecomendations] = useState(undefined);
  const [showInvesting, setShowInvesting] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    
  }, [getCurrentProfile]);

  const fetchRecomendations = () => {
    var data = {
      age: profile.age,
      gender: profile.gender,
      student: profile.student,
      salary: profile.salary,
      country: profile.location.country,
      city: profile.location.city,
      state: profile.location.state
    }
    axios.post("https://hek-wetern-sehwen.herokuapp.com/getlinks", data)
    .then(response => {
     console.log(response.data);
     setRecomendations(response.data);
    })      
.catch(error => {
  console.log(error);
})
  }

  const fetchInvesting = () => {
    var newVal = !showInvesting;
    setShowInvesting(newVal)
  }

return (

  <>

{profile === undefined || profile === null || (profile && !profile.transactions) || (profile.transactions.length === 0) ?

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
          <TimelineDot id = {(profile && profile.transactions && profile.transactions.length  > 0 )? 'complete' : 'incomplete'}  />
        </TimelineSeparator>
        <TimelineContent><p>Start recording transactions</p></TimelineContent>
      </TimelineItem>
    </Timeline>

    <h2>Just a few of our trackable categories</h2>


    <div class="container flex">
            <div class="card">
                <h4>Food</h4>
                <img src="https://www.flaticon.com/svg/static/icons/svg/857/857681.svg" alt=""></img>
            </div>
            <div class="card">
                <h4>Home</h4>
                <img src="https://www.flaticon.com/svg/static/icons/svg/846/846449.svg" alt=""></img>
              </div>
              <div class="card">
                <h4>Transport</h4>
                <img src="https://www.flaticon.com/svg/static/icons/svg/995/995334.svg" alt=""></img>
              </div>
              <div class="card">
                <h4>Leisure</h4>
                <img src="https://www.flaticon.com/svg/static/icons/svg/3028/3028292.svg" alt=""></img>
              </div>
              <div class="card">
                <h4>Health</h4>
                <img src="https://www.flaticon.com/svg/static/icons/svg/898/898655.svg" alt=""></img>
              </div>
              <div class="card">
                <h4>Subscriptions</h4>
                <img src="https://www.flaticon.com/svg/static/icons/svg/2178/2178036.svg" alt=""></img>
              </div>
              <div class="card">
                <h4>Other</h4>
                <img src="https://www.flaticon.com/svg/static/icons/svg/2911/2911213.svg" alt=""></img>
              </div>
        </div>
    
    </div>
    
    : 
    // (profile.transactions.length === 0) ? 
    
    // : 
   <>
   {/* temp solutions */}
    <h1 className='dashboard-header'>Hello {user && user.name}</h1>
<Chart transactions={profile.transactions}/>
<Button onClick={() => fetchRecomendations()} id='dashboard-reco-button'>Are there any grants available to me?</Button>
{recomendations && 
<div className='fetch-links-container'>
  <h1>Personal recommendations</h1>
  {(recomendations.substring(0, recomendations.length - 1).split(',')).map(r => {
    return <a style={{width: '80%', margin: 'auto', textAlign: 'center', color: 'white'}}>{r}</a>
  })}
</div>
}
<Button onClick={() => fetchInvesting()} id='investing-reco-button'>What should I invest in?</Button>


{
  showInvesting && 
  <div className='investing-recos'>
    <p style={{width: '80%', margin: 'auto', textAlign: 'center'}}>
Based on today's economic data here are the top 3 stocks to invest in:
1. FedEx Stock (NYSE: FDX)
FedEx stock has a flat base with a 293.40 buy point. It already staged a rebound from its 50-day moving average, which offered a buying opportunity. Investors could still buy off the line, though they might want to wait to clear last week's high, with a 289.86 entry.

<br></br>
2. Target Stock (NYSE: TGT)
Target is in buy range after clearing a short pattern in heavy volume. The ideal buy point is 167.52.  The latest pattern was a bit short for a flat base, just above a prior flat base, but it's still actionable.
<br></br>
3. AMD Stock (NASDAQ: AMD)
AMD stock has a perfect IBD Composite Rating of 99. It has earned this due to its excellent earnings and stock market performance, and it holds a perfect EPS Rating of 99.
<br></br>

Open a TFSA today with SociaBank.
</p>
<img src="https://www.baystbull.com/wp-content/uploads/2019/08/scotia-logo.jpg" style={{width: '20rem', display: 'block', margin: '2rem auto auto auto', textAlign: 'center'}}></img>
</div>

}

<Button onClick={() => setShow(!show)} id='toggle-button'>View my receipts</Button>

{show && profile.receipts.length > 0 ?
profile.receipts.map(p => <img src={bucketRoot + "/" + p} alt={p}></img>)

:
<p>rip</p>
}

<Slider/>


</>
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