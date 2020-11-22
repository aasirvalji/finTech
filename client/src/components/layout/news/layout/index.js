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
// alanBtn({
//     key: alanKey,
//     onCommand: ({ command, articles, number }) => {
//         if (command === 'newHeadlines'){
//             setNewsArticles(articles)
//             setActiveArticle(-1);
//         }
//         else if (command === 'highlight') {
//             setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
//         }
//         else if (command === 'open'){
//             const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
//           const article = articles[parsedNumber - 1];

//           if (parsedNumber > articles.length) {
//             alanBtn().playText('Please try that again...');
//           } else if (article) {
//             window.open(article.url, '_blank');
//             alanBtn().playText('Opening...');
//           } else {
//             alanBtn().playText('Please try that again...');
//           }
//         }
//     }
// })
    }, [])


    return (
      <>
        <div className='news-layout-container'>
        <p>moneyz</p>
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
