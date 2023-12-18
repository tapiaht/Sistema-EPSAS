import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Header";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        anvigate('/')
      }
    })
  }
  return (
<Box m="20px">
<div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Sistema EPSAS - SABAYA</h4>
            </div>
            <Outlet />
        </div>
    </Box>
  );
};

export default Dashboard;
