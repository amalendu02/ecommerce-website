import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateTempQuantity, applyTempUpdate} from '../features/ShopCart/cartSlice';

function Cart() {
  const { items: cartItems, tempItems, totalPrice } = useSelector(state => state.cart)
//   useSelector(state=>console.log(state))
  const dispatch = useDispatch()
  const navigate=useNavigate();
  const handleRemoveItem=(id)=>{
    dispatch(removeFromCart(id))
  }
  const handleUpdateQuantity = (id,quantity)=>{
    dispatch(updateTempQuantity({id,quantity}))
  }
  const handleApplyUpdates=()=>{
    tempItems.forEach((item)=>{
        dispatch(applyTempUpdate(item.id))
    })
  }
  return (
    <div className="wrapper">
      <div className="cart-page-container">
        {cartItems.length === 0?(
            <div className='cart-empty'>
                <h3>Your cart is empty</h3>
                <button onClick={()=>navigate("/")}>back to home</button>
            </div>
        ): 
        ( <div className="cart-container">
          <h2>Your Cart</h2>

          {cartItems.map((item) => (
            <div className='cart-item' key={item.id}>
              <img src={item.images?.[0]} alt={item.title} />


              <div className='cart-item-details'>
                <h3>{item.title}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>

                <div>
                  <input type="number" min="1" 
                  value={tempItems.find((tempItem)=>tempItem.id===item.id) ?.quantity || item.quantity}
                  onChange={(e)=>handleUpdateQuantity(item.id,parseInt(e.target.value))}
                  />
                  <button onClick={handleApplyUpdates(item.id)}>Update</button>
                  <button onClick={()=>handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <p>Total : ${totalPrice.toFixed(2)}</p>
          </div>

          <button className='back-button' onClick={()=>navigate("/")}>Back to shopping</button>
        </div>) }
      </div>
    </div>
  )
}

export default Cart
