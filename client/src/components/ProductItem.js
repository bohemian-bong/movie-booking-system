import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductItem = (props) => {
  const navigate = useNavigate();
    const product = props.product;
    const handleClick = ()=>{
      props.setEvent(product);
      navigate('/event', { replace: true });
    }
  return (
    <div className="card m-2" style={{width: '18rem'}}>
    <img src={product.image} className="card-img-top" alt="..."/>
    <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <button className="btn btn-primary" onClick={handleClick}><i className="fa-solid fa-circle-info mx-1"></i>Show more</button>
    </div>
    </div>
  )
}

export default ProductItem