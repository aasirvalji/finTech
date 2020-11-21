import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";
import Landing from "./components/layout/landing";
import Navbar from './components/layout/navbar'

//Redux imports
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import alanBtn from '@alan-ai/alan-sdk-web';
const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    // if (window.location.href.split(':3000')[1] === '/create-log'){
     alanBtn({
         key: alanKey,
         onCommand: ({ command, userInput }) => {
             console.log(command, userInput)
             switch (command){
                //  case 'today': 
                //  let today = (new Date(Date.now()).toLocaleString().split(','))[0];
                //  setQuery(userInput);
                //  setDate(today);
                //  // alanBtn().playText("Hi! I am Alan");
                //  break;
                //  case 'past': 
                //  setQuery((userInput.split('I')[1]).trim());
                //  setDate(converToDate((userInput.split('I')[0]).trim()));
                //  break;
                //  default: 
                //  break;
             }
         }
     })
//  }
 }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
          <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
