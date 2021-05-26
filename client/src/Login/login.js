import React, { useEffect, useState } from "react";
import cssClasses from "../Common/module.css";
import Register from "../Register/register";
//import Chat from "./chatPage";
//import axios from "axios";
import Box from "@material-ui/core/Box";
import { orange } from '@material-ui/core/colors';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//import swal from "sweetalert";
import logoImage from "../Images/images.png"
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

//const baseUrl = "http://localhost:50860/api/";
const baseUrl = "http://localhost:4001/";
/*
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],

    },
  },
}))(Button);
*/
const Login = () => {
  const [state, setState] = useState({
    Username: "",
    Password: "",
  });
  const history = useHistory();
//alert("login");
localStorage.setItem("USER", "{roleId:-1}");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onLoginClick = () => {
    /*
    history.push({
      pathname: "/food"
    });
     debugger;

     const username= state.Username;
     alert(username);
    // var Userdata = JSON.stringify(user);
    */
     $.post(baseUrl + "login", {
       username: state.Username,
       password: state.Password
     }, (resp)=>{
        if (resp.roleId>0)
        {
          localStorage.setItem("USER", JSON.stringify(resp));
          history.push({
            pathname: "/food"
          });
        }else{
          alert("Invalid login");
        }
     });
     /*
       .then(function (response) {
         alert(response);
         if (response.data.status == true) {
           debugger;
           goToChat(response.data);
         } else {
           swal("Connot Login!", "Credentials are not Correct!", "error");
         }
       })
       .catch(function (error) {
         alert("Somthing went Wrong!");
       });
       */
  };

  function onRegisterClick() {

    history.push({
      pathname: "/register",
    });
  }


  const loginCredentials = () => {

    return (
      <div>
        <div className="topHeader" >
          <img src={logoImage} height="50px"/>
        </div>
      <header className="App-header">
        <div className="LoginBox">
          <h2 style={{ color: "black" }}>Log in</h2>
          <h5 style={{ color: "black" }}>Don't have an account? <a onClick={onRegisterClick} style={{ color: "#ff9800" }}>Sign up today</a></h5>
          <Box display="flex" flexDirection="column" justifyContent="center" >
          <TextField
            name="Username"
           
            label="Username"
            type="text"
            value={state.Username}
            onChange={handleInputChange}
          />

          <TextField
            name="Password"
            
            label="Password"
            type="password"
            value={state.Password}
            onChange={handleInputChange}
          />

        </Box>

          <Button variant="contained" color="primary"
            type="submit" onClick={onLoginClick}>
          Login
      </Button>

        </div>
      </header>
      </div>
    );
  };

  return loginCredentials();
};

export default Login;