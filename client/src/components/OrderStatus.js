import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderStatus = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/orders/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        const json = await response.json();
        setBooking(json.order);
        console.log(json.order);
      } catch (error) {
        console.error('Error fetching showtimes:', error.message);
      }
    };

    fetchBooking();
  }, [id]);

  const handleGoToHomepage = () => {
    // Navigate to the homepage without refreshing
    window.location.href = '/';
  };

  return (
    <>
      {/* Popup for Payment Successful */}
      {showPopup && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payment Successful</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowPopup(false)}></button>
              </div>
              <div className="modal-body">
                Your payment was successful. Thank you for booking!
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowPopup(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mt-5">
        <h2 className="mb-4">Receipt</h2>
        <div className="row">
          <div className="col-md-6">
            <h5>Details</h5>
            <p>Movie Name: {booking.orderItem?.name}</p>
            <p>Booking Date: {booking.updatedAt}</p>
            <p>Booking ID: {id}</p>
            <p>Price per Ticket: {booking.orderItem?.price}</p>
            <p>Number of Tickets: {booking.orderItem?.amount}</p>
            <p>Booking Charges: {booking.bookingFee}</p>
          </div>
          <div className="col-md-6">
            <h5>Summary</h5>
            <p>Subtotal: {booking.subtotal}</p>
            <p>Tax: {booking.tax}</p>
            <hr />
            <h4>Total: {booking.total}</h4>
            <h4> Payment Status: {booking.status}</h4>
          </div>
        </div>
        {/* Link to go to the homepage */}
        <div className="mt-4">
          <Link to="/" className="btn btn-primary" onClick={handleGoToHomepage}>
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
