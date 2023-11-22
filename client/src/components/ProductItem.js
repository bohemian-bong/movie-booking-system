import React from 'react'
import { Link } from 'react-router-dom';

const ProductItem = (props) => {
    const product = props.product;
    
  return (
    <div className="card m-2" style={{width: '18rem'}}>
    <img src={product.image} className="card-img-top" alt="..."/>
    <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <Link to={`/event/${product._id}`} className="btn btn-primary"><i className="fa-solid fa-circle-info mx-1"></i>Show more</Link>
    </div>
    </div>
  )
}

export default ProductItem