import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';


import useStyles from './styles';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) => {
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

      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} title={title} />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" href={url}>Learn More</Button>
        <Typography variant="h5" color="textSecondary" component="h2">{i + 1}</Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;