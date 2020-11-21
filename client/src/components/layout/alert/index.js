import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//material ui imports
import MuiAlert from '@material-ui/lab/Alert';

const Alert = ({ alerts }) => {
  return(
  alerts !== undefined &&
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <MuiAlert
    severity={alert.alertType}
    elevation={6}
    variant="filled"
    id="mui-alert"
    key={alert.id}
    style={{ width: '85%', margin: '0rem auto 2rem auto' }}
  >
    {alert.msg}
  </MuiAlert>
    )
))};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  //mutate redux state to prop
  alerts: state.alert,
});



export default connect(mapStateToProps, {})(Alert);
