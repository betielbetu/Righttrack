import React, { useEffect, useState } from "react";
import "../Common/module.css";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Register from "../Register/register";
//import Chat from "./chatPage";
//import axios from "axios";
import Box from "@material-ui/core/Box";
import { orange } from '@material-ui/core/colors';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import $ from "jquery";

//import swal from "sweetalert";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
  } from "react-router-dom";
import logoImage from "../Images/images.png"
const baseUrl = "http://localhost:4001/";
const BootstrapButton = withStyles({
    root: {
      width:'40px',
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#0063cc',
      borderColor: '#0063cc',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#ff9800',
        borderColor: '#ff9800',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#ff9800',
        borderColor: '#ff9800',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  })(Button);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  const theme = createMuiTheme({
    palette: {
      primary: orange,
    },
  });
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      width:'200px',
      marginLeft:'40%',
      '&:hover': {
        backgroundColor: orange[700],
  
      },
    },
  }))(Button);
 
const AddFood = () =>{
  const [state, setState] = useState({
    FoodName: "",
    Carbs: "",
    Fat: "",
    Protein: "",
    Calories: "",
  });
    const history = useHistory();
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setState({
        ...state,
        [name]: value,
      });
    };
    
  const onAddBtnClick = () => {
    alert(state.FoodName);

     $.post(baseUrl + "addFood", {
       foodName: state.FoodName,
       carbs: state.Carbs,
       fat: state.Fat,
       protein: state.Protein,
       calories: state.Calories,
     }, (user)=>{
        //alert (msg);
        console.log("ADD FOOD LOG USER");
        console.log(user);
        localStorage.setItem ("USER", JSON.stringify(user));
        history.push({
          pathname: "/food",
        });
     });
 ;
  }
    const classes = useStyles();

    return(
      <div>
        <div className="topHeader" >
          <img src={logoImage} height="50px"/>
        </div>
        <div className="CenterBox">
<Box display="flex" flexDirection="column" justifyContent="center">
            <h2>Add Food</h2>
            <br/>
            <TextField
              name="FoodName"
              label="Food Name"
              type="foodname"
              value={state.FoodName}
              //value={state.Username}
              onChange={handleInputChange}
            // variant="filled"
            />
            <br />
            <TextField
              name="Carbs"
              label="Carbs"
              type="carbs"
              value={state.Carbs}
              onChange={handleInputChange}
            // variant="filled"
            />
            <br />
            {/* <br />
          <br /> */}
            <TextField
              name="Fat"
              label="Fat"
              type="fat"
              value={state.Fat}
              onChange={handleInputChange}
            // variant="filled"
            />
            <br />
            <TextField
              name="Protein"
              label="Protein"
              type="protein"
              value={state.Protein}
              onChange={handleInputChange}
            // variant="filled"
            />
            <br />
            <TextField
              name="Calories"
              label="Calories"
              type="calories"
              value={state.Calories}
              onChange={handleInputChange}
            // variant="filled"
            />
            <br />
            {/* <br />
          <br /> */}
           <ColorButton variant="contained" color="primary"
            type="submit" onClick={onAddBtnClick}>
            Add Food +
      </ColorButton>
          </Box>
        </div>
        </div>
    );
        };
    

    export default AddFood;