import React, { useContext } from 'react';
import { storeContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './placeOrder.css';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, url, cartItems } = useContext(storeContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    const allFieldsFilled = Object.values(formValues).every(val => val.trim() !== '');

    if (!allFieldsFilled) {
      alert('Please fill in all the fields.');
      return;
    }

    // ✅ FIX: Use "items" key instead of "itemId"
    const items = Object.entries(cartItems).map(([foodId, quantity]) => ({
      foodId,
      quantity
    }));

    const orderPayload = {
      userId: localStorage.getItem("userId"),
      items: items, 
      amount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2,
      address: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        street: formValues.street,
        city: formValues.city,
        state: formValues.state,
        pinCode: formValues.pinCode,
        country: formValues.country,
        phone: formValues.phone
      }
    };

    console.log("Sending order payload:", orderPayload); 

    try {
      const response = await axios.post(`${url}/api/order/place`, orderPayload, {
        headers: {
          token: token
        }
      });

      if (response.data.success) {
        alert("Order placed successfully!");
        navigate('/payment');
      } else {
        alert("Order failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Error placing order. Check console for details.");
    }
  };

  return (
    <form id='form' onSubmit={handleSubmit}>
      <div className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="title-fields">
            <input name='firstName' type="text" placeholder='First name' />
            <input name='lastName' type="text" placeholder='Last name' />
          </div>
          <input name='email' type="email" placeholder='Email address' />
          <input name='street' type="text" placeholder='Street' />
          <div className="title-fields">
            <input name='city' type="text" placeholder='City' />
            <input name='state' type="text" placeholder='State' />
          </div>
          <div className="title-fields">
            <input name='pinCode' type="text" placeholder='Pin Code' />
            <input name='country' type="text" placeholder='Country' />
          </div>
          <input name='phone' type="text" placeholder='Phone' />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()} /-</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 2} /-</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2} /-</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
