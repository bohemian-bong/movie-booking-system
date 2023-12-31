import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [showtimestitle, setshowtimestitle] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    genre: [],
    cast: [],
    director: '',
    image: null,
  });
  const [newShowtime, setNewShowtime] = useState({
    startAt: '',
    startDate: '',
    endDate: '',
    price: '',
  });

  const [productAlert, setProductAlert] = useState(null);
  const [showtimeAlert, setShowtimeAlert] = useState(null);

  const [movieid, setmovieid] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/products', {
          method: 'GET',
        });
        const json = await response.json();
        setProducts(json.products);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    getProducts();
  }, []);

  const loadShowtimesForProducts = async (productId, productName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/products/${productId}/showtimes`, {
        method: 'GET',
      });
      const json = await response.json();
      setShowtimes(json.showtimes);
      setshowtimestitle(productName);
      setmovieid(productId);
    } catch (error) {
      console.error('Error fetching showtimes:', error.message);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('genre', newProduct.genre);
      formData.append('cast', newProduct.cast.join(', '));
      formData.append('director', newProduct.director);

      if (newProduct.image) {
        const imageFormData = new FormData();
        imageFormData.append('image', newProduct.image, `${newProduct.name}.jpg`);

        const imageResponse = await fetch('http://localhost:5000/api/v1/products/uploadImage', {
          method: 'POST',
          body: imageFormData,
          credentials: 'include',
        });

        const imageJson = await imageResponse.json();

        formData.append('image', `/uploads/${newProduct.name}.jpg`);
        if (imageResponse.ok) {
        } else {
          console.error('Error uploading image:', imageJson.message);
          setProductAlert({ type: 'danger', message: 'Error uploading image. Please try again.' });
          setTimeout(() => {
            setProductAlert({});
          }, 5000);
          return;
        }
      }

      const response = await fetch('http://localhost:5000/api/v1/products', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const json = await response.json();

      if (response.ok) {
        setProducts((prevProducts) => [...prevProducts, json.product]);
        setProductAlert({ type: 'success', message: 'Product created successfully!' });
        setTimeout(() => {
          setProductAlert({});
        }, 5000);
        setNewProduct({
          name: '',
          description: '',
          genre: [],
          cast: [],
          director: '',
          image: null,
        });
      } else {
        console.error('Error creating product:', json.message);
        setProductAlert({ type: 'danger', message: 'Error creating product. Please try again.' });
        setTimeout(() => {
          setProductAlert({});
        }, 5000);
      }
    } catch (error) {
      console.error('Error creating product:', error.message);
      setProductAlert({ type: 'danger', message: 'An unexpected error occurred.' });
      setTimeout(() => {
        setProductAlert({});
      }, 5000);
    }
  };

  const handleCreateShowtime = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/showtimes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product: movieid,
          startAt: newShowtime.startAt,
          startDate: new Date(newShowtime.startDate).toISOString(),
          endDate: new Date(newShowtime.endDate).toISOString(),
          price: newShowtime.price,
        }),
      });
      const json = await response.json();

      if (response.ok) {
        setShowtimes((prevShowtimes) => [...prevShowtimes, json.showtime]);
        setShowtimeAlert({ type: 'success', message: 'Showtime created successfully!' });
        setTimeout(() => {
          setShowtimeAlert({});
        }, 5000);
        setNewShowtime({
          startAt: '',
          startDate: '',
          endDate: '',
          price: '',
        });
      } else {
        console.error('Error creating showtime:', json.message);
        setShowtimeAlert({ type: 'danger', message: 'Error creating showtime. Please try again.' });
        setTimeout(() => {
          setShowtimeAlert({});
        }, 5000);
      }
    } catch (error) {
      console.error('Error creating showtime:', error.message);
      setShowtimeAlert({ type: 'danger', message: 'An unexpected error occurred.' });
      setTimeout(() => {
        setShowtimeAlert({});
      }, 5000);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString();
  };

  return (
    <div className="container mt-5">
      <h3 className="my-4">Products Dashboard</h3>

      {/* Product Alert */}
      {productAlert && (
        <div className={`alert alert-${productAlert.type} alert-dismissible fade show`} role="alert">
          {productAlert.message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setProductAlert(null)}></button>
        </div>
      )}

      <div className="container d-flex flex-wrap">
        {products.map((product) => (
          <div key={product._id} className="card m-2" style={{ width: '18rem' }}>
            <img src={`http://localhost:5000${product.image}`} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <button className="btn btn-primary" onClick={() => loadShowtimesForProducts(product._id, product.name)}>
                Show Showtimes
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card m-2" style={{ width: '24rem' }}>
        <div className="card-body">
          <h5 className="card-title">Create New Product</h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateProduct();
            }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                name="genre"
                value={newProduct.genre.join(', ')}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, genre: e.target.value.split(',').map((s) => s.trim()) })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="cast">Cast (Comma-separated)</label>
              <input
                type="text"
                className="form-control"
                id="cast"
                name="cast"
                value={newProduct.cast}
                onChange={(e) => setNewProduct({ ...newProduct, cast: e.target.value.split(',').map((s) => s.trim()) })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="director">Director</label>
              <input
                type="text"
                className="form-control"
                id="director"
                name="director"
                value={newProduct.director}
                onChange={(e) => setNewProduct({ ...newProduct, director: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                name="image"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              />
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Create Product
            </button>
          </form>
        </div>
      </div>

      {/* Showtime Alert */}
      {showtimeAlert && (
        <div className={`alert alert-${showtimeAlert.type} alert-dismissible fade show`} role="alert">
          {showtimeAlert.message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowtimeAlert(null)}></button>
        </div>
      )}

      <div className="card m-2" style={{ width: '24rem' }}>
        <div className="card-body">
          <h5 className="card-title">Create New Showtime for {showtimestitle}</h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateShowtime();
            }}
          >
            <div className="form-group">
              <label htmlFor="startAt">Start Time</label>
              <input
                type="text"
                className="form-control"
                id="startAt"
                name="startAt"
                value={newShowtime.startAt}
                onChange={(e) => setNewShowtime({ ...newShowtime, startAt: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={newShowtime.startDate}
                onChange={(e) => setNewShowtime({ ...newShowtime, startDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={newShowtime.endDate}
                onChange={(e) => setNewShowtime({ ...newShowtime, endDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={newShowtime.price}
                onChange={(e) => setNewShowtime({ ...newShowtime, price: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Create Showtime
            </button>
          </form>
        </div>
      </div>

      <h3 className="my-4">Showtimes ({showtimestitle})</h3>
      {showtimes.length === 0 ? (
        <p>No Showtimes Present</p>
      ) : (
        <div className="container d-flex flex-wrap">
          {showtimes.map((showtime) => (
            <div key={showtime._id} className="card m-2" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Start Time: {showtime.startAt}</h5>
                <p className="card-text">
                  {formatDate(showtime.startDate)} - {formatDate(showtime.endDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
