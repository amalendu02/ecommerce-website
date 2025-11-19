import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/ShopCart/productSlice';
import { addToCart } from '../features/ShopCart/cartSlice';

function ProductList() {
  
  const {items:products,status} = useSelector((state)=>state.products);

  const searchText = useSelector(state => state.filter.searchText);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(status === 'idle') {
      dispatch(fetchProducts())
    }
  },[status]);

  // ADDED: filter logic (no change to existing flow)
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if(status ==='loading') return <p>Loading Products..</p>
  if(status ==='failed') return <p>Failed to load Products . Please try again</p>
  return (
    <>
    <Navbar/>
    <div className='product-list'>

    {/* ADDED: show when empty */}
      {filteredProducts.length === 0 && <p>No products found.</p>}

   { filteredProducts.map(product=>(
      <div className='product-card' key={product.id}>
        <img src={product.images?.[0]} alt={product.title} />
        <h2>{product.title.length>20?`${product.title.slice(0,20)}...`:product.title}</h2>
        <p>Price : ${product.price}</p>
        <button onClick={()=>dispatch(addToCart(product))}>Add To Cart</button>
      </div>
   )) }
    </div>
    </>
  )
}

export default ProductList