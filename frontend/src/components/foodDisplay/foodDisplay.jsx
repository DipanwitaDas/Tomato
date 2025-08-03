import React, { useContext } from 'react'
import { storeContext } from '../../context/storeContext'
import './foodDisplay.css'
import FoodItem from '../foodItem/foodItem'

const foodDisplay = ({category}) => {

    const {food_list} = useContext(storeContext)

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dises near you</h2>
        <div className="food-display-list">
            {food_list.map((item, index)=>{

              if(category === "All" || category === item.category){
                 return <FoodItem key= {index} id={item._id} name ={item.name} description = {item.description} price = {item.price} image = {item.image}/>
              }
               
            })}
        </div>
    </div>
  )
}

export default foodDisplay