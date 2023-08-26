import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import SessionCheck from '@/pages/components/sessionCheck';

function CompanyDetails({ details }) {
    return (
        <>
        <SessionCheck/>
        <div className="container px-5 py-24 mx-auto flex flex-col gap-4 items-center text-center bg-gradient-to-b from-zinc-50 to-blue-100 h-screen">
            <h1 className="font-semibold mb-6 text-5xl">Company </h1>
            <ul className="grid gap-5">
                {details.map((items, index) => (
                    <li key={items.id} className="bg-white p-6 shadow rounded-lg hover:shadow-md hover:shadow-black">
                        <p className="text-gray-800 text-3xl font-normal my-5"><span className='font-extrabold text-blue-400'>VISION</span> : {items.vision}</p>
                        <p className="text-gray-800 text-3xl font-normal"><span className='font-extrabold text-lime-600'>MISSION</span>: {items.mission}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('http://localhost:3000/users/companyDetails');
        const details = response.data;
        return { props: { details } };
    } catch (error) {
        console.error('Error fetching customer reviews:', error);
        return { props: { details: [] } };
    }
}

export default CompanyDetails;
