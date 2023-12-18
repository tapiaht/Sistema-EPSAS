import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import 'bootstrap/dist/css/bootstrap.min.css'
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebary";
import PrivateRoute from './Components/ProtectedRoute'
import Start from './Components/Start'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import handleLogout from './Components/HandleLogout';
import Contacts from './scenes/contacts';
import Customer from './Components/Customer';
import EditCustomer from './Components/EditCustomer';
import AddCustomer from './Components/AddCustomer';
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [authenticated, setAuthenticated] = useState(false); // Add authentication state
  useEffect(() => {
    // Check if authentication data is stored in localStorage
    const storedAuthData = localStorage.getItem('authData');

    if (storedAuthData) {
      // If authentication data exists, set authenticated to true
      setAuthenticated(true);
    }
  }, []);
  const handleLogin = () => {
    // Implement your login logic and set authenticated to true
    setAuthenticated(true);
    localStorage.setItem('authData', 'valid');
  };

  const handleLogout = () => {
    // Implement your logout logic and set authenticated to false
    setAuthenticated(false);
    localStorage.removeItem('authData');
  };
  return (
<ColorModeContext.Provider value={colorMode}>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Box flexGrow={1}>
        <Topbar setIsSidebar={setIsSidebar} />
        <main className="content" style={{ display: "flex" }}>
          {isSidebar && <Sidebar isSidebar={isSidebar} handleLogout={handleLogout} />}
         <Routes>
            <Route path='/' element={<Start />}/>
            <Route path='/adminlogin' element={<Login onLogin={handleLogin}/>}/>
            {/* <Route path='/employee_login' element={<EmployeeLogin />}/>
            <Route path='/employee_detail/:id' element={<EmployeeDetail />}/> */}
            <Route 
              path='/dashboard' 
               element={
                <PrivateRoute isAuthenticated={authenticated}>
                  {/* <Login onLogin={handleLogin} showTopbar={!authenticated} showSidebar={!authenticated} /> */}
                  <Dashboard />
                </PrivateRoute>
              }>
              <Route path='' element={<Home />}></Route>
              <Route path='/dashboard/employee' element={<Employee />}></Route>
              <Route path='/dashboard/category' element={<Category />}></Route>
              <Route path="/dashboard/contacts" element={<Contacts />} />
              <Route path="/dashboard/customer" element={<Customer />} />
              <Route path='/dashboard/profile' element={<Profile />}></Route>
              <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
              <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
              <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
              <Route path='/dashboard/add_customer' element={<AddCustomer />}></Route>
              <Route path='/dashboard/edit_customer/:id' element={<EditCustomer />}></Route>
            </Route>
          </Routes>
        </main>
      </Box>
    </BrowserRouter>
  </ThemeProvider>
</ColorModeContext.Provider>
  )
}

export default App
