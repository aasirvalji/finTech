import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/register";
import Login from "../auth/login";
import PrivateRoute from './PrivateRoute';
import Dashboard from '../layout/create-logs/main'
import Alert from '../layout/alert'
import Entries from '../layout/entries'
import Layout from '../layout/news/layout'
import Upload from '../layout/upl'
// import Profile from '../layout/profile'
import Camera from '../layout/camera'
import ContinousSlider from '../layout/sliding-panel'
import InputPage from '../layout/input-page'
import ProfileForm from '../layout/profile/create/index'
import EditProfile from '../layout/profile/update/index'

const Routes = ({ query, date}) => {
  return (
    <section>
      { console.log(query, date)}
     <Alert />
      <Switch>
      <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/upload" component={Upload} />
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

        <PrivateRoute exact path='/dashboard' component={Entries}/>
        <PrivateRoute exact path='/camera' component={Camera}/>
        <PrivateRoute exact path='/create-profile' component={ProfileForm}/>
        <PrivateRoute exact path='/update-profile' component={EditProfile}/>
      </Switch>
    </section>
  );
};

export default Routes;
