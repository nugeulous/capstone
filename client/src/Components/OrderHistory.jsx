import React, { useState, useEffect } from 'react';
import { fetchOrdersByOwnerId } from '../API/api';
import NoAccess from './PlaygroundPages/EventsComponents/NoAccess';

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

    const orderStyle = {
        border: '5px solid ',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 8px 0', 
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Order History</h1>
            <div style={{ margin: '0 auto', maxWidth: '600px' }}>
                {orders.map((order) => (
                    <div key={order.id} style={orderStyle}>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                            <li><strong>Order #{order.id}:</strong> {order.service_type} for {order.pet_type} with {order.petsitter_fname} on {order.start_date}.
                                <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                                    {order.start_time ? <li>Duration: {order.start_time} - {order.end_time}. </li> : <li>Duration: {order.start_date} - {order.end_date}. </li>}
                                </ul>
                            </li>
                        </ul>
                    </div>
                ))}
                {error && <NoAccess />}
            </div>
        </div>
    );
}
