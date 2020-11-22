import React, { useEffect, useState } from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2';
import './index.css'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// material ui tab helper functions
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 400
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));
 

// chart schema
var data = {
        labels: [],
        datasets:[
          {
            label:'Recent spending',
            data:[
            ],
            backgroundColor:[
            ]
          }
        ]
      }

const Chart = ({ transactions }) => {
    const [chartData, setChartData] = useState(data);

   // material tabs helper 
   const [value, setValue] = useState(0);

    // const [dates, setDates] = useState([]);
    // const [amounts, setAmounts] = useState([]);
    const [numOfPoints, setNumOfPoints] = useState(0);
    const [defaultProps, setDefaultProps] = useState(
        {
            displayTitle:true,
            displayLegend: true,
            legendPosition:'right',
            location:'City'
          }
    )

   useEffect(() => {
    var finalDict = {}
    console.log(transactions)
    for (var i = 0; i < transactions.length; i++) {
      var formattedDate = transactions[i].formattedDate
    
      if (finalDict[formattedDate] !== undefined){
          finalDict[formattedDate] += transactions[i].total;
      }
      else{
        finalDict[formattedDate] = transactions[i].total;
      }
    }
    
    console.log(finalDict)
    
    
    var dates = [];
    for(var key in finalDict) {
        dates[dates.length] = key;
    }
    
    dates.sort(function compare(a, b) {
      var dateA = new Date(a);
      var dateB = new Date(b);
      return dateA - dateB;
    });
    
    
    var totals = [];
    for(var key in dates) {
        totals[key] = finalDict[dates[key].toString()];
    }

    // format graph display

    var numOfDataPoints = Object.keys(finalDict).length;
    setNumOfPoints(numOfDataPoints);
    var increment = 1 / numOfDataPoints;

    var colors = [];
    for (var i = 1; i <= numOfDataPoints; i++){
      var alpha = i * increment;
      colors.push(`rgba(0, 0, 0, ${alpha})`)
    }

    setChartData({
      labels: Object.keys(finalDict),
      datasets:[
        {
          label:'Recent spending',
          data: Object.values(finalDict),
          backgroundColor: colors
        }
      ]
    })

   }, [])


   // misc material ui 
   const classes = useStyles();

   const handleChange = (event, newValue) => {
     setValue(newValue);
   };

    return (
      <>
        <div className="chart">
        {/* <Bar
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text: `Your last ${numOfPoints} transactions`,
              fontSize:25,
              fontColor: '#000000'
            },
            legend:{
              display:defaultProps.displayLegend,
              position:defaultProps.legendPosition,
              fontColor: '#000000'
            }
          }}
        />

        <Line
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text: `Your last ${numOfPoints} transactions`,
              fontSize:25,
              fontColor: '#000000'
            },
            legend:{
              display:defaultProps.displayLegend,
              position:defaultProps.legendPosition,
              fontColor: '#000000'
            }
          }}
        />

        <Pie
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text: `Your last ${numOfPoints} transactions`,
              fontSize:25,
              fontColor: '#000000'
            },
            legend:{
              display:defaultProps.displayLegend,
              position:defaultProps.legendPosition,
              fontColor: '#000000'
            }
          }}
        /> */}
      </div>



      <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="ViewIt 1" {...a11yProps(0)} />
        <Tab label="ViewIt 2" {...a11yProps(1)} />
        <Tab label="ViewIt 3" {...a11yProps(2)} />
      </Tabs>

      
      <div className='test'>
      <TabPanel value={value} index={0}>
      <Bar
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text: `Your last ${numOfPoints} transactions`,
              fontSize:25,
              fontColor: '#000000'
            },
            legend:{
              display:false,
              position:defaultProps.legendPosition,
              fontColor: '#000000'
            }
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
      
      <Line
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text: `Your last ${numOfPoints} transactions`,
              fontSize:25,
              fontColor: '#000000'
            },
            legend:{
              display:false,
              position:defaultProps.legendPosition,
              fontColor: '#000000'
            }
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Pie
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text: `Your last ${numOfPoints} transactions`,
              fontSize:25,
              fontColor: '#000000'
            },
            legend:{
              display:defaultProps.displayLegend,
              position:defaultProps.legendPosition,
              fontColor: '#000000'
            }
          }}
        />
      </TabPanel>
      </div>
    </div>



</>
    )
}

export default Chart;