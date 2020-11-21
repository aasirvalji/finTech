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

const Routes = () => {
  return (
    <section>
     <Alert />
      <Switch>
      <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/upload" component={Upload} />
        <PrivateRoute exact path="/compare" component={Layout} />
        <PrivateRoute exact path="/create-log" component={Dashboard} />
        <PrivateRoute exact path='/dashboard' component={Entries}/>
      </Switch>
    </section>
  );
};

export default Routes;
