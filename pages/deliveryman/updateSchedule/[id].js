import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SessionCheck from '@/pages/components/sessionCheck';


const UpdateSchedule = ({ schedule }) => {

    const [updatedData, setUpdatedData] = useState({});
    const router = useRouter();

    const [success, setSuccess] = useState('')

    const handleUpdate = async () => {
        try {
            console.log(updatedData)
            await axios.put(`http://localhost:3000/users/updateSchedule/${schedule.id}`, updatedData);
            setSuccess(' update successfully');
        }
        catch (error) {
            setSuccess('Error updating user:', error);
        }
    };

    const handleDelete = async () => {
        try {
            console.log(updatedData)
            await axios.delete(`http://localhost:3000/users/deleteSchedule/${schedule.id}`);
            setSuccess('deleted successfully');
            router.push('/deliveryman/scheduleManagement')
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
                <div className="p-5 bg-white shadow-md shadow-black w-96 flex flex-col gap-3 rounded-lg">
                    <h1 className="text-xl font-bold">Update Schedule</h1>
                    <p className="text-red-500">{success}</p>
                    <div className="my-2">
                        <label className="block font-semibold">Day:</label>
                        <p className="text-gray-700">{schedule.Day}</p>
                    </div>
                    <div className="my-2">
                        <label className="block font-semibold">Time:</label>
                        <p className="text-gray-700">{schedule.Time}</p>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="btn bg-red-500 text-white hover:bg-red-600 transition duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>



        </>
    );
};

export default UpdateSchedule;

// Rest of the code remains the same


export async function getServerSideProps(context) {

    const id = context.params.id;

    console.log(id);

    const response = await axios.get('http://localhost:3000/users/schedule/' + id);
    const schedule = await response.data;

    return { props: { schedule } }
}