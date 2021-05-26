import React, { useEffect, useState } from "react";
import "./food.css"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import logoImage from "../Images/images.png"
import $ from 'jquery';
import axios from 'axios';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { Box } from "@material-ui/core";
import FlatList from 'flatlist-react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
var foods = [];
//ßlocalStorage.setItem("USER", null);
var user=JSON.parse(localStorage.getItem("USER"));
var carbs=0;
var fat=0;
var protein=0;
var calories=0;
var food=null;
//alert(user);
if (user !=null){
// alert(user.username);
  refresh(true);
}
//user=await axios.get("");
//function pageLoad (){
  //alert("test");
   $.get("http://localhost:4001/currentUser", function (resp){
  user = resp;
  console.log(user);
  if (user.roleId == -1)
  {
    //alert("User not logged in");
    window.location.replace("/login");
    return;
  }
  localStorage.setItem ("USER", JSON.stringify(user));
  console.log(resp);
 // alert("refresh");
  console.log(foods);
  
 // if (foods != null){
})
function refresh(rl){
  
    carbs=0;
    fat=0;
    protein=0;
 calories=0;
 if (user==null)
    return;
  foods=user.foodLog;
  if (foods==null)
    return;
  foods.forEach ((food)=>{
    //alert(food.info.carbs)
    console.log ("FOOD: ", food);
    calories+=parseInt(food.info.calories);
    carbs += parseInt(food.info.carbs);
    fat += parseInt(food.info.fat);
    protein += parseInt(food.info.protein);
  });

  carbs = parseInt((carbs/calories)*100);
  fat = parseInt((fat/calories)*100);
  protein = parseInt((protein/calories)*100);
  console.log ("CARBS: ", carbs);
  food=foods;
  
  //Food();
}

//}
 //pageLoad();
const renderFood = (food, idx) => {
 //food=foods;
/*
  { name: 'Turkey Burger', info: { carbs: 24, fat: 20, protein: 60, calories: 106 } },
  { name: 'Cottage Cheese', info: { carbs: 44, fat: 50, protein: 10, calories: 179 } },
]
*/
console.log("RENDER FOODS: ");
console.log (food);
  const textContainer = {
    width: '40%',
  };
 
  return (
    <div className="flatlist-container">
      <div style={textContainer}>{food.name}</div>
      <div className="circle-container">
        {getCircle(food.info.fat, "blue")}
        {getCircle(food.info.protein, "yellow")}
        {getCircle(food.info.calories, "yellowgreen")}
      </div>
    </div >

  );
}


const getCircle = (text, color) => {
  return (
    <div className={getStyleClassForCircleForColor(color)}>
      <p className="text">{text}</p>
    </div>
  )
}

const getStyleClassForCircleForColor = (color) => {
  switch (color) {
    case 'blue':
      return 'circle-blue';
      break;

    case 'yellow':
      return 'circle-yellow';
      break;

    case 'yellowgreen':
      return 'circle-green'
      break;

    default:
      return 'circle-blue';
  }
}
const BlackColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#000'),
    backgroundColor: '#000',

    '&:hover': {
      backgroundColor: '#000',

    },
  },
}))(Button);

const Food = () => {
  //window.reload()
  const history = useHistory();
  
//alert("FOOD")

  function backToAddFoodPage() {
    history.push({
      pathname: "/addfood",
    });
  };

  const renderItem = renderFood.bind(this);
  console.log ("FOOD.FOODS: ");
  console.log(foods);
  return (
    <div>
      <div className="topHeader" >
        <img src={logoImage} height="50px" />
      </div>
      <div className="CenterBox">
        <link href="https://fonts.googleapis.com/css?family=Raleway:400,300,600,800,900" rel="stylesheet" type="text/css"></link>
        <h3>[user]'s Track</h3>
        <h4>5.4.2021</h4>
        {/* <Card width="25%">
        <Typography variant="h3" component="h2">
          1200 <a> cals</a>
        </Typography>

      </Card> */}
        <div className="semiprogressbar-container">

          <div className="Card ">
            <div className="semiprogressbar-container">
              <h1>
    <span id='totalCalories'>{calories}</span> &nbsp;
</h1>
              <h4 className={"Card-text"}>
                cals
</h4>
            </div>
          </div>
        </div>
        <div className="semiprogressbar-container">
          <div className="Circle">
            <div style={{ width: '80%' }}>
              <SemiCircleProgressBar diameter={80} percentage={carbs} showPercentValue stroke="#00aaff" />
              <p style={{ color: "#00aaff" }}>CARBS</p>
            </div>
          </div>

          <div className="Circle">
            <div style={{ width: '80%' }}>
              <SemiCircleProgressBar diameter={80} percentage={fat} showPercentValue stroke="#ffea00" />
              <p style={{ color: "#ffea00" }}>FAT</p>

            </div>
          </div>

          <div className="Circle">
            <div style={{ width: '80%' }}>
              <SemiCircleProgressBar diameter={80} percentage={protein} showPercentValue stroke="#00ff6e" />
              <p style={{ color: "#00ff6e" }}>PROTEIN</p>

            </div>
          </div>
        </div>
        <h3>Food Log</h3>

        <ul>
          <FlatList
            list={foods}
            renderItem={renderItem}
            renderWhenEmpty={() => <div>List is empty!</div>}
          // sortBy={["firstName", { key: "lastName", descending: true }]}
          // groupBy={person => person.info.age > 18 ? 'Over 18' : 'Under 18'}
          />
        </ul>

        <BlackColorButton
          variant="contained"
          color="primary"
          type="submit"
          onClick={backToAddFoodPage}
        >
          Add Food +
        </BlackColorButton>


      </div >
    </div>
  );
};

export default Food;