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
import Profile from '../layout/profile'
import Camera from '../layout/camera'
import ContinousSlider from '../layout/sliding-panel'
import InputPage from '../layout/input-page'

const Routes = ({ query, date}) => {
  return (
    <section>
      { console.log(query, date)}
     <Alert />
      <Switch>
      <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/slider" component={ContinousSlider} />
        <PrivateRoute exact path="/compare" component={Layout} />
        <PrivateRoute exact path="/entry" component={InputPage} />
        
        <Route exact path="/create-log"
        render={(props) => (
          <Dashboard {...props} qq={query} dd={date}/>
        )}
        />

        <PrivateRoute exact path='/dashboard' component={Entries}/>
        <PrivateRoute exact path='/camera' component={Camera}/>
        <PrivateRoute exact path='/profile' component={Profile}/>
      </Switch>
    </section>
  );
};

export default Routes;
