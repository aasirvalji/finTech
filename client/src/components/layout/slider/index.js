import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { random } from 'colors';
import './index.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
  },
  margin: {
    height: theme.spacing(3),
  },
}));


export default function TrackInvertedSlider() {


  const classes = useStyles();


  // INCOME //

  var monthly = false;

  const [salary, setSalary] = React.useState(1);
  const [incomeValue, setIncomeValue] = React.useState(25);
  const [incomeMarks, setIncomeMarks] = React.useState([
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '200000'.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
  ]);

  const handleIncomeChange = (event, newValue) => {

    setIncomeValue(newValue);
    var newMax = incomeValue * salary * newValue;


    setSavingsMarks([{ value: 0, label: '0'}, { value: 100, label: String((incomeValue*2000).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
    setfoodDrinkMarks([{ value: 0, label: '0'}, { value: 100, label: String((incomeValue*2000-(savingsValue*incomeValue/100)*2000).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
    sethomeMarks([{ value: 0, label: '0'}, { value: 100, label: String((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
    setcarMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
    setclothingMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
    setentertainmentMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
    setsubscriptionMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  sethealthMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setotherMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+200).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);


  };

  function incomeValueText(incomeValue) {
    return `${incomeValue}`;
  }



  // SAVINGS //
const [savingsValue, setSavingsValue] = React.useState(50);
const [savingsMarks, setSavingsMarks] = React.useState([
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '50000',
  },
]);

const handleSavingsChange = (event, newValue) => {
  setSavingsValue(newValue);


  setfoodDrinkMarks([{ value: 0, label: '0'}, { value: 100, label: String((incomeValue*2000-(savingsValue*incomeValue/100)*2000).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  sethomeMarks([{ value: 0, label: '0'}, { value: 100, label: String((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setcarMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setclothingMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setentertainmentMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setsubscriptionMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  sethealthMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setotherMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+200).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);


  console.log("Savings " + String(savingsValue))
};

function savingsValueText(savingsValue) {
    return `${savingsValue}`;
}




// EXPENSES //

// FOOD // 
const [foodDrinkValue, setfoodDrinkValue] = React.useState(50);
const [foodDrinkMarks, setfoodDrinkMarks] = React.useState([
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '50000',
  },
]);

const handlefoodDrinkChange = (event, newValue) => {
  setfoodDrinkValue(newValue);



  sethomeMarks([{ value: 0, label: '0'}, { value: 100, label: String((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setcarMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setclothingMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setentertainmentMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setsubscriptionMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  sethealthMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setotherMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+200).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);

};

function foodDrinkValueText(foodDrinkValue) {
    return `${foodDrinkValue}`;
}


// HOME // 


const [homeValue, sethomeValue] = React.useState(50);
const [homeMarks, sethomeMarks] = React.useState([
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '50000',
  },
]);

const handlehomeChange = (event, newValue) => {
  sethomeValue(newValue);



  setcarMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setclothingMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setentertainmentMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setsubscriptionMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  sethealthMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setotherMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+200).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);


};

function homeValueText(homeValue) {
    return `${homeValue}`;
}




// CAR // 

const [carValue, setcarValue] = React.useState(50);
const [carMarks, setcarMarks] = React.useState([
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '50000',
  },
]);

const handlecarChange = (event, newValue) => {
  setcarValue(newValue);

  setclothingMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*5000+2500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setentertainmentMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*5000+2500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setsubscriptionMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*5000+2500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  sethealthMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setotherMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+200).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);



};

function carValueText(carValue) {
    return `${carValue}`;
}


// CLOTHING // 

const [clothingValue, setclothingValue] = React.useState(50);
const [clothingMarks, setclothingMarks] = React.useState([
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '50000',
  },
]);

const handleclothingChange = (event, newValue) => {
  setclothingValue(newValue);

  setentertainmentMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*5000+2500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setsubscriptionMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*5000+2500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  sethealthMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setotherMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+200).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);


};

function clothingValueText(clothingValue) {
    return `${clothingValue}`;
}


// ENTERTAINMENT // 

const [entertainmentValue, setentertainmentValue] = React.useState(50);
const [entertainmentMarks, setentertainmentMarks] = React.useState([
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '50000',
  },
]);

const handleentertainmentChange = (event, newValue) => {
  setentertainmentValue(newValue);
  
  setsubscriptionMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*5000+2500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  sethealthMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setotherMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*1000+200).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);



};

function entertainmentValueText(entertainmentValue) {
    return `${entertainmentValue}`;
}


// SUBSCRIPTIONS // 

const [subscriptionsValue, setsubscriptionsValue] = React.useState(50);
const [subscriptionsMarks, setsubscriptionMarks] = React.useState([
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '50000',
  },
]);

const handlesubscriptionsChange = (event, newValue) => {
  setsubscriptionsValue(newValue);

  sethealthMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*5000+2500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);
  setotherMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*5000+2500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);



};

function subscriptionsValueText(subscriptionsValue) {
    return `${subscriptionsValue}`;
}

// HEALTH // 

const [healthValue, sethealthValue] = React.useState(50);
const [healthMarks, sethealthMarks] = React.useState([
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '50000',
  },
]);

const handlehealthChange = (event, newValue) => {
  sethealthValue(newValue);

  setotherMarks([{ value: 0, label: '0'}, { value: 100, label: String(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)-(((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100))-((((incomeValue*2000-(savingsValue*incomeValue/100)*2000-((incomeValue*2000)-(savingsValue*incomeValue/100)*2000)*foodDrinkValue/100)*homeValue/100)*carValue/100))-Math.random()*5000+2500).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}]);



};

function healthValueText(healthValue) {
    return `${healthValue}`;
}

// OTHER // 

const [otherValue, setotherValue] = React.useState(50);
const [otherMarks, setotherMarks] = React.useState([
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '50000',
  },
]);

const handleotherChange = (event, newValue) => {
  setotherValue(newValue);




};

function otherValueText(otherValue) {
    return `${otherValue}`;
}

  return (

    <div class="container">
    <div className={classes.root}>
      <Typography id="track-inverted-slider" gutterBottom>
        Yearly Income
      </Typography>
      <Slider
        track="inverted"
        aria-labelledby="track-inverted-slider"
        onChange={handleIncomeChange}
        getAriaincomeValueText={incomeValueText}

        defaultValue={50}
        marks={incomeMarks}
      />

<Typography id="track-inverted-slider" gutterBottom>
       Savings
      </Typography>
<Slider

        track="inverted"
        aria-labelledby="track-savings-slider"
        onChange={handleSavingsChange}
        getAriaincomeValueText={savingsValueText}

        defaultValue={50}
        marks={savingsMarks}
      />

<Typography id="track-inverted-slider" gutterBottom>
        Food drink
      </Typography>
<Slider
        track="inverted"
        aria-labelledby="track-expenses-slider"
        onChange={handlefoodDrinkChange}
        getAriaincomeValueText={foodDrinkValueText}

        defaultValue={50}
        marks={foodDrinkMarks}
      />


<Typography id="track-inverted-slider" gutterBottom>
        Home
      </Typography>
<Slider
        track="inverted"
        aria-labelledby="track-home-slider"
        onChange={handlehomeChange}
        getAriaincomeValueText={homeValueText}

        defaultValue={50}
        marks={homeMarks}
      />

<Typography id="track-inverted-slider" gutterBottom>
        Car
      </Typography>
<Slider
        track="inverted"
        aria-labelledby="track-car-slider"
        onChange={handlecarChange}
        getAriaincomeValueText={carValueText}

        defaultValue={50}
        marks={carMarks}
      />

<Typography id="track-inverted-slider" gutterBottom>
        Clothing
      </Typography>
<Slider
        track="inverted"
        aria-labelledby="track-clothing-slider"
        onChange={handleclothingChange}
        getAriaincomeValueText={clothingValueText}

        defaultValue={50}
        marks={clothingMarks}
      />
<Typography id="track-inverted-slider" gutterBottom>
        Entertainment
      </Typography>
<Slider
        track="inverted"
        aria-labelledby="track-entertainment-slider"
        onChange={handleentertainmentChange}
        getAriaincomeValueText={entertainmentValueText}

        defaultValue={50}
        marks={entertainmentMarks}
      />
<Typography id="track-inverted-slider" gutterBottom>
        Subscriptions
      </Typography>
<Slider
        track="inverted"
        aria-labelledby="track-subscriptions-slider"
        onChange={handlesubscriptionsChange}
        getAriaincomeValueText={subscriptionsValueText}

        defaultValue={50}
        marks={subscriptionsMarks}
      />

<Typography id="track-inverted-slider" gutterBottom>
        Health
      </Typography>
<Slider
        track="inverted"
        aria-labelledby="track-health-slider"
        onChange={handlehealthChange}
        getAriaincomeValueText={healthValueText}

        defaultValue={50}
        marks={healthMarks}
      />


<Typography id="track-inverted-slider" gutterBottom>
        Other
      </Typography>
<Slider
        track="inverted"
        aria-labelledby="track-other-slider"
        onChange={handleotherChange}
        getAriaincomeValueText={otherValueText}

        defaultValue={50}
        marks={otherMarks}
      />

</div>
    </div>
  );
}
