import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchText } from '../features/filterSlice';   

function Navbar() {
  const cartItems = useSelector(state=>state.cart.items)
  const dispatch = useDispatch()

  const [input, setInput] = useState("")  

  return (
    <nav>
        <h1>Shopping Cart</h1>
        
        {/* SEARCH BAR ADDED BELOW */}
        <div style={{ display:"flex", gap:"10px" }}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          />
          <button onClick={()=>dispatch(setSearchText(input))}>
            Search
          </button>
        </div>
        {/* END SEARCH BAR */}

        <div>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart({cartItems.length})</Link>
        </div>
    </nav>
  )
}

export default Navbar
