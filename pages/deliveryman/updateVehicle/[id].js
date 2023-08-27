import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SessionCheck from '@/pages/components/sessionCheck';

const UpdateVehicle = ({ vehicle }) => {

    const [updatedData, setUpdatedData] = useState({});
    const router = useRouter();

    const [success, setSuccess] = useState('')

    const handleUpdate = async () => {
        try {
            console.log(updatedData)
            await axios.put(`http://localhost:3000/users/updateVehicle/${vehicle.id}`, updatedData);
            setSuccess(' update successfully');
        }
        catch (error) {
            setSuccess('Error updating user:', error);
        }
    };

    const handleDelete = async () => {
        try {
            console.log(updatedData)
            await axios.delete(`http://localhost:3000/users/deleteVehicle/${vehicle.id}`);
            setSuccess(' deleted successfully');
            router.push('/deliveryman/updateVehicle')
        }
        catch (error) {
            setSuccess('Error deleting:', error);
        }
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <SessionCheck />
            <div className="flex flex-col justify-center items-center text-center bg-gradient-to-b from-zinc-50 to-blue-100 h-screen">
                <div className="p-5 bg-white shadow-md w-96 flex flex-col gap-3 rounded-lg">
                    <h1 className="text-xl font-bold">Update Vehicle</h1>
                    <p className="text-red-500">{success}</p>
                    <div className="my-2">
                        <label className="block font-semibold">Company:</label>
                        <input
                            type="text"
                            name="company"
                            value={updatedData.company || vehicle.company}
                            onChange={handleInputChange}
                            className="border p-1 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="my-2">
                        <label className="block font-semibold">Model:</label>
                        <input
                            type="text"
                            name="model"
                            value={updatedData.model || vehicle.model}
                            onChange={handleInputChange}
                            className="border p-1 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="my-2">
                        <label className="block font-semibold">Year:</label>
                        <input
                            type="number"
                            name="year"
                            value={updatedData.year || vehicle.year}
                            onChange={handleInputChange}
                            className="border p-1 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleUpdate}
                        className="btn bg-blue-400 text-black hover:text-white hover:bg-blue-600 transition duration-300"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn btn-outline btn-error hover:text-red-600 transition duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>



        </>
    );
};

export default UpdateVehicle;

// Rest of the code remains the same


export async function getServerSideProps(context) {

    const id = context.params.id;

    console.log(id);

    const response = await axios.get('http://localhost:3000/users/getVehiclesById/' + id);
    const vehicle = await response.data;

    return { props: { vehicle } }
}