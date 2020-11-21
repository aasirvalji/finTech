import React, { Fragment, useEffect, useState } from "react";
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

  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
     alanBtn({
         key: alanKey,
         onCommand: ({ command, userInput }) => {
             console.log(command, userInput)
             switch (command){
                 case 'today': 
                  if (window.location.href.split(':3000')[1] !== '/create-log') alanBtn().playText("Please navigate to the create log page first");
                 let today = dateMonthSwap((new Date(Date.now()).toLocaleString().split(','))[0]);
                 setQuery(userInput);
                 setDate(today);
                 // alanBtn().playText("Hi! I am Alan");
                 break;
                 case 'past': 
                  if (window.location.href.split(':3000')[1] !== '/create-log') alanBtn().playText("Please navigate to the create log page first");
                 setQuery((userInput.split('I')[1]).trim());
                 setDate(converToDate((userInput.split('I')[0]).trim()));
                 break;
                 default: 
                 break;
             }
         }
     })
 }, []);

const converToDate = d => {
  var splitDate = d.split(' ');
  var month = splitDate[0];
  console.log(month)
  var day = splitDate[1];
  var year = splitDate[2];

  // get month
  var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  for (var i = 0; i < months.length; i++) {
  if (month.toLowerCase().includes(months[i])){
      month = (i + 1).toString();
  }
}

  day = day.replace(/\D/g,'');
  return `${day}/${month}/${year}`
}

const dateMonthSwap = d => {
  var splitData = d.split('/');
  return `${splitData[1]}/${splitData[0]}/${splitData[2]}`
}

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
          <Route exact path="/" component={Landing} />
          { console.log(query, date)}
            <Route  
            render={(props) => (
              <Routes {...props} query={query} date={date}/>
            )}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default (App);
