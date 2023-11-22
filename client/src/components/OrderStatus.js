import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const OrderStatus = () => {
    const { id }= useParams();
    const [booking, setbooking] = useState({})
    useEffect(() => {
        const fetchBooking = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/v1/orders/${id}`, {
              method: 'GET',
              credentials: 'include'
            });
            const json = await response.json();
            setbooking(json.order);
            console.log(json.order);
          } catch (error) {
            console.error('Error fetching showtimes:', error.message);
          }
        };
    
        fetchBooking();
      }, [id]);
  return (
    booking.orderItem && <div className="container mt-5">
      <h2 className="mb-4">Receipt</h2>
      <div className="row">
        <div className="col-md-6">
          <h5>Details</h5>
          <p>Movie Name: {booking.orderItem.name}</p>
          <p>Booking Date: {booking.updatedAt}</p>
          <p>Booking ID: {id}</p>
          <p>Price per Ticket: {booking.orderItem.price}</p>
          <p>Number of Tickets: {booking.orderItem.amount}</p>
          <p>Booking Charges: {booking.bookingFee}</p>
        </div>
        <div className="col-md-6">
          <h5>Summary</h5>
          <p>Subtotal: {booking.subtotal}</p>
          <p>Tax: {booking.tax}</p>
          <hr />
          <h4>Total: {booking.total}</h4>
          <h4> Payment Status: {(booking.status)}</h4>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus
