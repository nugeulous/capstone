import React from 'react';
import {useState, useEffect } from "react";
import { fetchOrdersByOwnerId } from '../API/api';

export default function OrderHistory({ user }) {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);


useEffect(() => {
    const getOrders = async () => {
      try {
        const fetchedOrders = await fetchOrdersByOwnerId(user.id);
        setOrders(fetchedOrders);
      } catch (error) {
        setError(error.message);
      }
    };
    getOrders();
  }, []);


    return (
        <div>
            <h1>Order History</h1>

          <div>
      {orders.map((order) => (
        <div key={order.id}>
      <ul>
        <li>Order #{order.id}. {order.service_type} for {order.pet_type} with {order.petsitter_fname} on {order.start_date}. 
        <ul>
        {order.start_time ? <li>Duration: {order.start_time} - {order.end_time}. </li> : <li>Duration: {order.start_date} - {order.end_date}. </li>}
        </ul>
        </li>

      </ul>
      
        </div> 
       ))} 
      {error && <p>Error: {error}</p>}
    </div>
        </div>

    );
}


// {order.service !== "sitter" && <li>Order #{order.id}. {order.service_type} for {order.pet_type} with {order.petsitter_fname} on {order.start_date} from {order.start_time} - {order.end_time}</li>}
// {order.service === "sitter" && <li>Order #{order.id}. {order.service_type} for {order.pet_type} with {order.petsitter_fname} from {order.start_date} - {order.end_date}</li>}}