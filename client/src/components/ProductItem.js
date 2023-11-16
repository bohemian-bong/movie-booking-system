import React from 'react'

const ProductItem = (props) => {
    const product = props.product;
  return (
    <div className="card m-2" style={{width: '18rem'}}>
    <img src={product.image} className="card-img-top" alt="..."/>
    <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <a href="/" className="btn btn-primary">Book Tickets</a>
    </div>
    </div>
  )
}

export default ProductItem
