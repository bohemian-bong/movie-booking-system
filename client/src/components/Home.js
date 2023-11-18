import React, {useState, useEffect} from "react";
import ProductItem from "./ProductItem";

export default function Home(props){
    const [products, setproducts] = useState([]);
    useEffect(()=>{
        const getProducts = async ()=>{
            const response = await fetch("http://localhost:5000/api/v1/products", {
                method: "GET"
            });
            const json = await response.json();
            setproducts(json.products);
        }
        getProducts();
    },[])
    return(
        <div className="container">
            <h3 className="my-4">Movies Showing Now...</h3>
            <div className="container d-flex flex-wrap">
                    {products.map((product) => {
                        return <ProductItem key={product._id} product={product} setEvent={props.setEvent}/>
                    })}

            </div>
        </div>
        
    )
}