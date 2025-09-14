import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from "./Pages/Footer/Footer"; 
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
  <Navbar/>
  <Outlet/>
  <Footer/>
  </>
}
