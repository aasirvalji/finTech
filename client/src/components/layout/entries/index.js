import React, { useEffect, useState } from 'react'
import { getEntries } from '../../../actions/entry'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cards from '../cards';
import alanBtn from '@alan-ai/alan-sdk-web';
import {Bar, Line, Pie} from 'react-chartjs-2';
import Fab from '@material-ui/core/Fab';
import './index.css'

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';
const chartData = {
  labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
  datasets:[
    {
      label:'Population',
      data:[
        617594,
        181045,
        153060,
        106519,
        105162,
        95072
      ],
      backgroundColor:[
        'rgba(99, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ]
    }
  ]
}

const Entries = ({ getEntries, entry: { entries }, auth: { user }}) => {
  const [value, setValue] = React.useState(0);

    useEffect(() => {
        getEntries()
    }, getEntries)

const getEntryKeys = () => {
  var map = new Map();

    for (var i = 0; i < entries.length; i++){
      const {date, totalScore} = entries[i];
      map.set(date, totalScore);
    }

    var mapAsc = new Map([...map.entries()].sort(function(a, b){
      var aa = a.toString().split('/').reverse().join(),
      bb = b.toString().split('/').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
  }));

  var keys = [];
  for (const [key, value] of mapAsc.entries()) {
    keys.push(key);
  }

  return keys;
}

const getEntryVals = () => {
  var map = new Map();

    for (var i = 0; i < entries.length; i++){
      const {date, totalScore} = entries[i];
      map.set(date, totalScore);
    }

    var mapAsc = new Map([...map.entries()].sort(function(a, b){
      var aa = a.toString().split('/').reverse().join(),
      bb = b.toString().split('/').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
  }));

  var vals = [];
  for (const [key, value] of mapAsc.entries()) {
    vals.push(value);
  }

  return vals;
}

const formatEntries = () => {
  const res = {};
  var r = {};
  const labels = getEntryKeys();
  const vals = getEntryVals();
  res.labels = getEntryKeys();
  
  var data = [];
  var color = [];
  for (var i = 0; i < labels.length; i++){
    data.push(vals[i]);
    color.push(`rgba(99, 99, ${Math.random() * 100}, 0.6)`)
  }
  r.label = 'pollution';
  r.data = data;
  r.backgroundColor = color;
  res.datasets = [r];

  return res;
}

const handleChange = (event, newValue) => {
  console.log(newValue)
  setValue(newValue);
};

    return (
        <div>
        {entries && entries.length !== 0 && 
        <>
        {user && 
        <>
        <div className='header-container'>
        <h1>Welcome, {user.name}</h1>
        </div>
        </>
        }
        <Paper className='tabs-container' style={{background: '#2ECC40', color: 'white'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="white"
        centered
      >
        <Tab label="Line" style={{color: 'white'}}/>
        <Tab label="Bar" style={{color: 'white'}}/>
        <Tab label="Pie" style={{color: 'white'}}/>
      </Tabs>
    </Paper>
        <div className='chart-container'>
        {value === 0 &&
                <Line
          data={formatEntries()}
          options={{
            title:{
              display:'CO2',
              text:`CO2 emissions over the past ${entries.length}`,
              fontSize:25
            },
            // legend:{
            //   display:this.props.displayLegend,
            //   position:this.props.legendPosition
            // }
          }}
        />
        }
        {value === 1 &&
                <Bar
          data={formatEntries()}
          options={{
            title:{
              display:'CO2',
              text:`CO2 emissions over the past ${entries.length}`,
              fontSize:25
            },
            // legend:{
            //   display:this.props.displayLegend,
            //   position:this.props.legendPosition
            // }
          }}
        />
        }
        {value === 2 &&
                <Pie
          data={formatEntries()}
          options={{
            title:{
              display:'CO2',
              text:`CO2 emissions over the past ${entries.length}`,
              fontSize:25
            },
            // legend:{
            //   display:this.props.displayLegend,
            //   position:this.props.legendPosition
            // }
          }}
        />
        }
        </div>
        </>
        }

        {/* <div className='compare-prompt'>
        <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
        </div> */}

           <Cards entries={entries}></Cards>
        </div>
    )
}

Entries.propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    entry: state.entry,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getEntries })(Entries);
  
