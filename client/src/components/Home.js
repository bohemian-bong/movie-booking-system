import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [numOfReviewsImage, setNumOfReviewsImage] = useState(false);
  const [movieRatingsImage, setMovieRatingsImage] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:5000/api/v1/products", {
        method: "GET",
      });
      const json = await response.json();
      setProducts(json.products);
    };

    const getImages = async () => {
      try {
        const imageResponse = await fetch("http://localhost:5000/api/v1/products/stat/rating", {
          method: "GET",
        });
        // Assuming the response is of type image/jpeg
        const blob = await imageResponse.blob();
        
        if (imageResponse.ok) {
            setNumOfReviewsImage(true);
            setMovieRatingsImage(true);
          // Create a URL for the image blob
          const imageUrl = URL.createObjectURL(blob);

          // Set the images in the state
          if (imageResponse.url.includes('top_rated_movies.jpg')) {
            setMovieRatingsImage(imageUrl);
          } else if (imageResponse.url.includes('top_reviewed_movies.jpg')) {
            setNumOfReviewsImage(imageUrl);
          }
        } else {
          console.error('Error fetching images:', imageResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    getProducts();
    getImages();
  }, []);

  return (
    <div className="container">
      <h3 className="my-4">Movies Showing Now...</h3>
      <div className="container d-flex flex-wrap">
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
        {movieRatingsImage && (
          <img src="http://localhost:5000/uploads/top_rated_movies.jpg" alt="Top Rated Movies" style={{ width: "50%" }} />
        )}
        {numOfReviewsImage && (
          <img src="http://localhost:5000/uploads/top_reviewed_movies.jpg" alt="Top Reviewed Movies" style={{ width: "50%" }} />
        )}
    </div>
  );
}
