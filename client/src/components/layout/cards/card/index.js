import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';


import useStyles from './styles';

const Item = ({ article: { date, query, totalScore, title, url, urlToImage }, activeArticle, i }) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    window.scroll(0, 0);

    // size 20 because we will always have 20 cards
    // _ represents a parameter we're not going to be using
    // create a ref for each element in it array (if ref for element doesn't exist)  

    // gets called once at the start to set up all of our references
    setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);

  return (
    <Card ref={elRefs[i]} className={ activeArticle === i ? classes.activeCard : classes.card}>
    {/* connect each card to a reference in elRefs */}

      <CardActionArea>
        <CardMedia className={classes.media} image={totalScore >= 20 ? 'https://bit.ly/37C3LWU' : totalScore > 14 && totalScore < 20 ? 'https://bit.ly/37Gf6VJ' : 'https://bit.ly/3dTGJMa'} title={title} />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2" className={classes.detailDate}>{date}</Typography>
          <Typography variant="body2" color="textSecondary" component="h2" className={classes.detailQuery}>{query}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="p" component="p">CO2 Emissions: {totalScore.toString()} kg/hour</Typography>
      </CardActionArea>
    </Card>
  );
};

export default Item;