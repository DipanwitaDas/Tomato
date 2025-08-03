import React from 'react'
import './exploreMenu.css'
import {menu_list} from '../../assets/assets'

const exploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Order fresh and delicious meals from your favorite local restaurants delivered quickly to your door Experience convenience quality and satisfaction with every order you place</p>
        <div className="explore-menu-list">
            {menu_list .map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name? "All" : item.menu_name)} key={index} className='explore-menu-list-items'>
                        <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt=''/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default exploreMenu