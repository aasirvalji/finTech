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

const VoiceGuide = ({
    addEntry,
    getEntry,
    qq, 
    dd,
    auth: { user },
}) => {

    const [query, setQuery] = useState(qq);
    const [date, setDate] = useState(dd);
    const [mentions, setMentions] = useState([]);

    useEffect(() => {
        setQuery(qq);
        setDate(dd);
      }, [qq, dd]);

//   useEffect(() => {
//    if (window.location.href.split(':3000')[1] === '/create-log'){
//     alanBtn({
//         key: alanKey,
//         onCommand: ({ command, userInput }) => {
//             console.log(command, userInput)
//             switch (command){
//                 case 'today': 
//                 let today = (new Date(Date.now()).toLocaleString().split(','))[0];
//                 setQuery(userInput);
//                 setDate(today);
//                 // alanBtn().playText("Hi! I am Alan");
//                 break;
//                 case 'past': 
//                 setQuery((userInput.split('I')[1]).trim());
//                 setDate(converToDate((userInput.split('I')[0]).trim()));
//                 break;
//                 default: 
//                 break;
//             }
//         }
//     })
// }
// }, []);

const submit = () => {
    addEntry({
        user: user._id,
        date: date,
        query: query,
    })
    console.log(user, date, query)
    setQuery(undefined);
    setDate(undefined)
}

// const converToDate = d => {
//     var splitDate = d.split(' ');
//     var month = splitDate[0];
//     console.log(month)
//     var day = splitDate[1];
//     var year = splitDate[2];

//     // get month
//     var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
//     for (var i = 0; i < months.length; i++) {
//     if (month.toLowerCase().includes(months[i])){
//         month = (i + 1).toString();
//     }
// }

//     day = day.replace(/\D/g,'');
//     return `${day}/${month}/${year}`
// }

    return (
        <>

        <div className='dashboard-container'>
           <Paper elevation={3} className='dashboard-right'>
           <h1>Voice queue</h1>
           
        {mentions.length === 0 && !query && 
        <div className='voice-instructions-container'>
            <p>Today i bought &lt;items&gt; for &lt;price&gt;, a &lt;items&gt; for &lt;price&gt;, ...</p>
            <p>On December 14th 2001, i bought &lt;items&gt; for &lt;price&gt;, a &lt;items&gt; for &lt;price&gt;, ...</p>
        </div>

            }
        
        <List component="nav" class='voice-recieved' aria-label="secondary mailbox folders">
        {mentions && query && 
        <div>
            <p>Your input has been recieved: </p> 
             <p> {query} </p>
             <p>Press Confirm to submit your recording</p>
            </div>
        }
        </List>

           </Paper>
        </div>

        {query &&
            <>
        <div className='confirm-container'>
        <Button variant="contained" onClick={() => submit()} style={{backgroundColor: '#000000', color: 'white'}}>
            Confirm
        </Button>
        </div>
        </>
        }
        </>
    )
}

VoiceGuide.propTypes = {
    auth: PropTypes.object.isRequired,
    addEntry: PropTypes.func.isRequired,
    getEntry: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, { addEntry, getEntry })(
    VoiceGuide
  );
