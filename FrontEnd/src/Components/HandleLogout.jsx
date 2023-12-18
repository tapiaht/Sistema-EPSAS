import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const handleLogout  = () => {
    const anvigate = useNavigate()
    axios.defaults.withCredentials = true  
  return (
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        anvigate('/')
      }
    })
  )
}

export default handleLogout