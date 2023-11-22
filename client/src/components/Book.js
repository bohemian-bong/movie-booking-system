// BookTicket.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Book = (props) => {
  const { id } = useParams();
  const [showtimes, setShowtimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowid, setSelectedShowid] = useState('');
  const [numOfTickets, setNumOfTickets] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [bookingCharges, setBookingCharges] = useState(0);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [movie, setMovie] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [pintentId, setPintentId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/products/${id}/showtimes`, {
          method: 'GET',
        });
        const json = await response.json();
        setShowtimes(json.showtimes);
      } catch (error) {
        console.error('Error fetching showtimes:', error.message);
      }
    };

    fetchShowtimes();
  }, [id]);

  const handleShowtimeChange = (event) => {
    setSelectedShowid(event.target.value);
  }

  const handleNumOfTicketsChange = (event) => {
    setNumOfTickets(parseInt(event.target.value, 10));
  };

  const handleBookTickets = async () => {
    try {
      // Make a fetch call to create the order
      const response = await fetch(`http://localhost:5000/api/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ showtime: selectedShowid, amount: numOfTickets, date: selectedDate }),
        credentials: 'include'
      });

      if (response.ok) {
        const json = await response.json();
        setTotalAmount(json.order.total);
        setSubTotalAmount(json.order.subtotal);
        setBookingCharges(json.order.bookingFee);
        setPrice(json.order.orderItem.price);
        setMovie(json.order.orderItem.name);
        setBookingDate(json.order.orderItem.bookingDate);
        setBookingId(json.order._id);
        setTax(json.order.tax);
        setPintentId(json.order.paymentIntentId);
        // Update the total amount based on the server's response
        // Show the "Pay" button or any additional steps
      } else {
        console.error('Error creating order:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };
  const handlePayment = async () => {
    try {
      // Make a fetch call to create the order
      const response = await fetch(`http://localhost:5000/api/v1/orders/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentIntentId: pintentId }),
        credentials: 'include'
      });

      if (response.ok) {
        const json = await response.json();
        // Update the total amount based on the server's response
        // Show the "Pay" button or any additional steps
        navigate(`/bookingstatus/${bookingId}`, { replace: true });
      } else {
        console.error('Error creating order:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
    }

  };

  return (
    <>
    <div className="container mt-5">
    <h1 className="mb-4">Book Tickets</h1>
    <div className="mb-3">
      <label className="form-label">Date:</label>
      <input type="date" className="form-control" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
    </div>
    <div className="mb-3">
      <label className="form-label">Showtime:</label>
      <select className="form-select" value={selectedShowid} onChange={handleShowtimeChange}>
        <option value="">Select Showtime</option>
        {showtimes.map((showtime) => (
          <option key={showtime._id} value={showtime._id}>
            {showtime.startAt} : {(new Date(showtime.startDate).toLocaleString()).split(',')[0]} - {(new Date(showtime.endDate).toLocaleString()).split(',')[0]} Price: Rs {showtime.price}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-3">
      <label className="form-label">Number of Tickets:</label>
      <input type="number" className="form-control" value={numOfTickets} onChange={handleNumOfTicketsChange} />
    </div>
    <div>
      <button className="btn btn-primary" onClick={handleBookTickets}>Book</button>
    </div>
  </div>
  <div className="container mt-5">
      <h2 className="mb-4">Payment Details</h2>
      <div className="row">
        <div className="col-md-6">
          <h5>Details</h5>
          <p>Movie Name: {movie}</p>
          <p>Booking Date: {bookingDate}</p>
          <p>Booking ID: {bookingId}</p>
          <p>Price per Ticket: {price}</p>
          <p>Number of Tickets: {numOfTickets}</p>
          <p>Booking Charges: {bookingCharges}</p>
        </div>
        <div className="col-md-6">
          <h5>Summary</h5>
          <p>Subtotal: {subTotalAmount}</p>
          <p>Tax: {tax}</p>
          <hr />
          <h4>Total: {totalAmount}</h4>
          <button className={`${price===0?'btn btn-primary disabled':'btn btn-primary '}`} onClick={handlePayment}>PAY NOW</button>
        </div>
      </div>
    </div>
</>
  );
};

export default Book;
