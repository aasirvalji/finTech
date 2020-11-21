import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
      // 250 px
    height: 200,
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
  },
  activeCard: {
    borderBottom: '10px solid #22289a',
    width: '100%'
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  detailDate: {
    width: '45%'
  },
  detailQuery: {
    width: '45%'
  }
});