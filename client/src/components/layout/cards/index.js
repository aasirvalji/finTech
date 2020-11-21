import React, { useEffect, useState } from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import Item from './card'
import alanBtn from '@alan-ai/alan-sdk-web';
import Card from './card';
import useStyles from './styles.js';
import './index.css'

const alanKey = 'a36736f23b21bfd709dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage';

const Cards = ({ entries }) => {
const classes = useStyles();

if (!entries.length) {
    return (
      <>
      <div className='no-entries-container'>
<h1>You don't have any entries yet!</h1>
<p>Return to the create entry page to get started!</p>
<img src='https://image.freepik.com/free-vector/business-people-finance-bank-illustration-financial-analytic-growth-graphic-office-banking-concept-money-man-background-design_109722-1065.jpg'/>
</div>
</>
    );
  }

  return (
    <Grow in>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {entries.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <Item i={i} article={article}/>
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};


  export default Cards;