import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEntry, getEntry } from '../../../../actions/entry';
import Paper from '@material-ui/core/Paper';
import './index.css'

import List from '@material-ui/core/List';
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

    return (
        <>
        {console.log(query, date)}
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
