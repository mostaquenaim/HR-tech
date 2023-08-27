import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Drawer from '../components/drawer'
import SessionCheck from '@/pages/components/sessionCheck';

function CustomerOrder({ Orders }) {
    return (
        <>
        <Drawer title="Order"/>
            <SessionCheck />

            {/* <Drawer title="Order" /> */}
            <div className="text-gray-600 body-font h-full">
                <div className="container mx-auto bg-gradient-to-b from-zinc-50 to-blue-100 h-screen flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <div className="mb-6">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Orders</h1>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Orders.map((order) => (
                                <div key={order.id} className="bg-white p-4 shadow-md hover:shadow-lg hover:shadow-black rounded-lg">
                                    <div>
                                        <label className="font-semibold">Order Pickup Point:</label>
                                        <p>{order.Pickup_Point}</p>
                                    </div>
                                    <div>
                                        <label className="font-semibold">Delivery Point:</label>
                                        <p>{order.Delivery_Point}</p>
                                    </div>
                                    <div>
                                        <label className="font-semibold">Product Type:</label>
                                        <p>{order.Product_Type}</p>
                                    </div>
                                    <div>
                                        <label className="font-semibold">Pickup Time:</label>
                                        <p>{order.PickUp_Time}</p>
                                    </div>
                                    <div>
                                        <label className="font-semibold">Delivery Time:</label>
                                        <p>{order.Delivery_Time}</p>
                                    </div>
                                    <div>
                                        <label className="font-semibold">Order Status:</label>
                                        <p>{order.Order_Status}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        className="btn bg-red-500 text-white hover:bg-red-600 transition duration-300 mt-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('http://localhost:3000/users/getAllOrders');
        const Orders = response.data;
        return { props: { Orders } };
    } catch (error) {
        console.error('Error fetching customer reviews:', error);
        return { props: { Orders: [] } };
    }
}

export default CustomerOrder;
