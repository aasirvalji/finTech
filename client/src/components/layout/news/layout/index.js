import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import useStyles from './styles';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import wordsToNumbers from 'words-to-numbers'
import NewsCards from '../NewsCards'
import { getEntries } from '../../../../actions/entry'
import { useHistory } from "react-router-dom";
import './index.css'

// 1:42:00
const alanKey = 'c594298fdefa873609dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage'

const Layout = ({ getEntries, entry: { entries }}) => {
  let history = useHistory();
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticles, setNewsArticles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const classes = useStyles();

    useEffect(() => {
      getEntries()
    }, [getEntries])
    
    useEffect(() => {
alanBtn({
    key: alanKey,
    onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines'){
            setNewsArticles(articles)
            setActiveArticle(-1);
        }
        else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if (command === 'open'){
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
    }
})
    }, [])

    const calcSum = (data) => {
      var sum = 0;
      for (var i = 0; i < data.length; i++){
        var { totalScore } = data[i];
        sum += totalScore;
      }
      return sum / data.length;
    }

    return (
      <>
        <div className='news-layout-container'>
        {!entries ? <p>loading</p> : calcSum(entries) < 20 
        ? <>
        <h1>Awesome! You're below the average person when it comes to CO2 emissions</h1>
        <p>Make a command to find out whats happening world wide with the environment</p>
        </>
         : calcSum(entries) === 20 
        ? 
        <>
        <h1>You're on par with the average person when it comes to CO2 emissions</h1>
        <p>Make a command to find out whats happening world wide with the environment</p>
        </>
        : 
        <>
        <h1>Oh no! You're above the average person when it comes to CO2 emissions</h1>
        <p>Make a command to find out whats happening world wide with the environment</p>
        </>
        }
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </>
    )
}


Layout.propTypes = {
  getPosts: PropTypes.func.isRequired,
  entries: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  entry: state.entry,
});

export default connect(mapStateToProps, { getEntries })(Layout);
