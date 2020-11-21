import React, { useEffect, useState, Fragment } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEntry, getEntry } from '../../../../actions/entry';
import Paper from '@material-ui/core/Paper';
import './index.css'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';

const Dashboard = ({
    addEntry,
    getEntry,
    auth: { user },
}) => {

    const [query, setQuery] = useState('');
    const [date, setDate] = useState('');
    const [mentions, setMentions] = useState([]);

  useEffect(() => {
    alanBtn({
        key: alanKey,
        onCommand: ({ command, userInput }) => {
            console.log(command, userInput)
            switch (command){
                case 'today': 
                let today = (new Date(Date.now()).toLocaleString().split(','))[0];
                console.log(today)
                setQuery(userInput);
                keyWordsUILoading(userInput)
                setDate(today);
                break;
                case 'past': 
                var pastRaw = (userInput.split('I')[0]).trim();
                setQuery((userInput.split('I')[1]).trim());
                keyWordsUILoading(userInput)
                setDate(converToDate((userInput.split('I')[0]).trim()));
                break;
                default: 
                break;
            }
        }
    })
}, []);

const submit = () => {
    addEntry({
        user: user._id,
        date: date,
        query: query,
    })
    console.log(user, date, query)
}

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

const keyWordsUILoading = d => {
    if (!d) return;
    const UIwords = ['shower', 'bath', 'groceries', 'grocery', 'fruit', 'vegetables', 'soda', 'house', 'fly', 'drive', 'watched'];
    const userInputSplit = d.split(' ');
    var res = [];

    for (var i = 0; i < UIwords.length; i++){
        for (var j = 0; j < userInputSplit.length; j++){
            if (userInputSplit[j] === UIwords[i]){
                var prefix = Math.random() < 0.5 ? 'I heard you mention' : 'Did I hear something about'
                res.push(`${prefix} ${userInputSplit[j]}`)
            }
        }
    }
    if (res.length === 0) res.push('Processing input...')
    setMentions(res);
}

    return (
        <>
        <div className='dashboard-container'>
           <Paper elevation={3} className='dashboard-left'>
           <div className='instructions'>
           <h1>Example queries<i class="fas fa-question-circle"></i></h1>
            <p>Tell us what you did today</p>
           </div>
<div>
<div className='example-queries'>
<p>A couple example statements to help get you started</p>
</div>
</div>
           </Paper>
           <Paper elevation={3} className='dashboard-right'>
           <h1>Voice queue</h1>
           
        {mentions.length === 0 && query &&  <p>Input recieved</p>}
        {mentions.length === 0 && !query && <p>Voice something to get started</p>}
        
        <List component="nav" aria-label="secondary mailbox folders">
        {mentions && query && 
        <p>Your input has been recieved! Press Confirm to submit your recording</p>
        }
        </List>

           </Paper>
        </div>
        {query &&
            <div className='confirm-container'>
        <Button variant="contained" onClick={() => submit()} style={{backgroundColor: '#2ECC40', color: 'white'}}>
  Confirm
</Button>
        </div>

        }

        <div className='dash-image-container'>
        <img src='https://image.freepik.com/free-vector/business-people-finance-bank-illustration-financial-analytic-growth-graphic-office-banking-concept-money-man-background-design_109722-1065.jpg'/>
        </div>

        </>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    addEntry: PropTypes.func.isRequired,
    getEntry: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, { addEntry, getEntry })(
    Dashboard
  );
