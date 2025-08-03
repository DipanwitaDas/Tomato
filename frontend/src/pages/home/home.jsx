import React, { useState } from 'react'
import './home.css'
import Header from '../../components/header/header'
import ExploreMenu from '../../components/exploreMenu/exploreMenu'
import FoodDisplay from '../../components/foodDisplay/foodDisplay'
import AppDownload from '../../components/appDownload/appDownload'
const home = () => {

    const[category,setCategory]=useState("All");

  return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} />
        <AppDownload />
    </div>
  )
}

export default home