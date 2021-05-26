import React, { useState } from "react";
import "../Common/module.css";
//import axios from "axios";
import Login from "../Login/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange, black } from '@material-ui/core/colors';
import logoImage from "../Images/images.png"

//import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
//import swal from "sweetalert";

const Register = () => {
  const baseUrl = "http://localhost:50860/api/";

  const [state, setState] = useState({
    Username: "",
    Email: "",
    Password: "",
  });

  const BootstrapButton = withStyles({
    root: {
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
  const OrangeColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],

      },
    },
  }))(Button);

  const BlackColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('#000'),
      backgroundColor: '#000',
      '&:hover': {
        backgroundColor: '#000',

      },
    },
  }))(Button);

  const history = useHistory();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  var user = {
    Username: state.Username,
    Password: state.Password,
    Email: state.Email,
  };

  const moveToLoginPage = () => {
    history.push({
      pathname: "/",
    });
  };
  // const onRegisterUser = () => {
  //   axios
  //     .post(baseUrl + "User/registerUser", user)
  //     .then(function (response) {
  //       if (response.data == true) {
  //         // swal(
  //         //   "User registerd Successfully!",
  //         //   "Click OK to Continue",
  //         //   "success"
  //         // );

  //         moveToLoginPage();
  //       } else {
  //         alert("Already Exist");
  //       }
  //     })
  //     .catch(function (error) {
  //       alert("Somthing went Wrong!");
  //     });
  // };

  function backToLogin() {
    history.push({
      pathname: "/",
    });
  }

  const registerCredentials = () => {
    return (
<div>
        <div className="topHeader" >
          <img src={logoImage} height="50px"/>
        </div>
      <header className="App-header">
        <div className="LoginBox">
          <h2 style={{ color: "black" }}>Create an account</h2>
          <h5 style={{ color: "black" }}>Already have an account? <a onClick={backToLogin} style={{ color: "#ff9800" }}> Log in</a></h5>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            margin="40px"
          >
            <TextField
              name="Username"
              type="text"
              value={state.Username}
              onChange={handleInputChange}
              label="Username"
            />

            <TextField
              name="Email"
              type="email"
              value={state.Email}
              onChange={handleInputChange}
              label="Email"
            />
            <TextField
              name="Password"
              type="password"
              value={state.Password}
              onChange={handleInputChange}
              label="Password"
            />
            <TextField
              name="Password"
              type="password"
              value={state.Password}
              onChange={handleInputChange}
              label="Confirm Password"
            />
            <br />
            <OrangeColorButton
              variant="contained"
              color="orange"
              type="submit"

            //onClick={onRegisterUser}
            >
              Create Account
        </OrangeColorButton>
            <br />
            <div style={{color:"#000"}}>OR</div>
            <br />
            <BlackColorButton
              variant="contained"
              color="primary"
              type="submit"
              onClick={backToLogin}
            >
              Login
        </BlackColorButton>
          </Box>
        </div>
      </header >
</div>
    );
  };

  return registerCredentials();
};

export default Register;