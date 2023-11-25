import React, { useState } from 'react';

const CreateProductModal = ({ onCreateProduct, onCloseModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    genre: '',
    cast: '',
    director: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateProduct(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCloseModal}>&times;</span>
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input type="text" className="form-control" id="genre" name="genre" value={formData.genre} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="cast">Cast</label>
                <input type="text" className="form-control" id="cast" name="cast" value={formData.cast} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="director">Director</label>
                <input type="text" className="form-control" id="director" name="director" value={formData.director} onChange={handleChange} />
              </div>
              <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;