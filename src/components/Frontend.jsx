import React from 'react'
import Header from './HeaderAndFoort/Header'
import Footer from './HeaderAndFoort/Footer'
import { Outlet } from 'react-router-dom'
import './../../src/App.css'
const Frontend = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Frontend