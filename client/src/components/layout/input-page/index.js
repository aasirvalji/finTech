import React, { useEffect, useState, Fragment }  from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Upload from '../upl/index';
import './index.css'

import Camera from '../camera'
import VoiceGuide from '../create-logs/main'

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
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function InputPage({ qq, dd }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <>
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="SnapiT" {...a11yProps(0)} />
        <Tab label="SpeakiT" {...a11yProps(1)} />
        <Tab label="UploadiT" {...a11yProps(2)} />
      </Tabs>
    {console.log(qq, dd, 'AHAJKLAJKLJAKSKA')}
{/* test */}
<div className='input-tabs'>
<TabPanel value={value} index={0} id='tab-1'>
        <Camera/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <VoiceGuide qq={qq} dd={dd}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Upload/>
      </TabPanel>
</div>
    </div>
    </>
  );
}