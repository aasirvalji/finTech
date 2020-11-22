import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/register";
import Login from "../auth/login";
import PrivateRoute from './PrivateRoute';
import Dashboard from '../layout/cards'
import Alert from '../layout/alert'
import Layout from '../layout/news/layout'
import Upload from '../layout/upl'
import Recos from '../layout/recos'
// import Profile from '../layout/profile'
import Camera from '../layout/camera'
import ContinousSlider from '../layout/sliding-panel'
import InputPage from '../layout/input-page'
import ProfileForm from '../layout/profile/create/index'
import EditProfile from '../layout/profile/update/index'
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// //materialUI imports
// import './index.module.css'
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper'

const Routes = ({ query, date, auth }) => {
  return (
    <section>
      { console.log(query, date)}
     <Alert />
      <Switch>
      <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/upload" component={Upload}/>
        <Route exact path="/my-histoy" component={Recos}/>
        {/* <Route exact path="/slider" component={ContinousSlider} /> */}

        {/* receipt check  */}
        <PrivateRoute exact path="/compare" component={Layout} />

        {/* <Route exact path="/entry" component={InputPage} qq={query} dd={date}/> */}

        <Route exact path="/create-a-entry"
        render={(props) => (
          <InputPage {...props} qq={query} dd={date}/>
        )}
        />
        
        {/* <Route exact path="/create-log"
        render={(props) => (
          <Dashboard {...props} qq={query} dd={date}/>
        )}
        /> */}

        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        <PrivateRoute exact path='/camera' component={Camera}/>
        <PrivateRoute exact path='/create-profile' component={ProfileForm}/>
        <PrivateRoute exact path='/update-profile' component={EditProfile}/>
      </Switch>
    </section>
  );
};

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth, //if user viewing profile has the same id as the profile being viewed, they should be able to edit
});

export default connect(mapStateToProps, { })(withRouter(Routes));
