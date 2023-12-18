import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";

import Topbar from "../scenes/global/Topbar"
import Sidebar from "../scenes/global/Sidebary";

import Dashboard from '../Components/Dashboard'
import Home from '../Components/Home'
import Employee from '../Components/Employee'
import Category from '../Components/Category'
import AddCategory from '../Components/AddCategory'
import AddEmployee from '../Components/AddEmployee'
import EditEmployee from '../Components/EditEmployee'
import Contacts from '../scenes/contacts';
import Customer from '../Components/Customer';
import EditCustomer from '../Components/EditCustomer';
import AddCustomer from '../Components/AddCustomer';

export default function PortalLayout({ children }) {
  const [theme, colorMode] = useMode();
  const auth = useAuth();

  async function handleSignOut(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signout();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>

    
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/me">Profile</Link>
            </li>
            <li>
              <Link to="/me">{auth.getUser()?.username ?? ""}</Link>
            </li>
            <li>
              <a href="#" onClick={handleSignOut}>
                Sign out
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
          <Topbar  />
           <Sidebar  />
          

                    {/* <Dashboard /> */}

                <Home />
                <Employee />
                <Category />
                <Contacts />
                <Customer />
                {/* <AddCategory /> */}
                {/* <AddEmployee /> */}
                {/* <EditEmployee /> */}
                {/* <AddCustomer />
                <EditCustomer /> */}

                {/* <Route path='/dashboard/category' element={}></Route>
                <Route path="/dashboard/contacts" element={} />
                <Route path="/dashboard/customer" element={} />
                <Route path='/dashboard/profile' element={<Profile />}></Route>
                <Route path='/dashboard/add_category' element={}></Route>
                <Route path='/dashboard/add_employee' element={}></Route>
                <Route path='/dashboard/edit_employee/:id' element={}></Route>
                <Route path='/dashboard/add_customer' element={}></Route>
                <Route path='/dashboard/edit_customer/:id' element={}></Route> */}
         
            
        
       
      
    </ThemeProvider>
  </ColorModeContext.Provider>
  </>
  );
}
