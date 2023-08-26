import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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
            <div>
                <div>
                    <h1>Update Vehicle</h1>
                    <p>{success}</p>
                </div>
                <div>
                    <div>
                        <label>Company:</label>
                        <input
                            type="text"
                            name="company"
                            value={updatedData.company || vehicle.company}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Model:</label>
                        <input
                            type="text"
                            name="model"
                            value={updatedData.model || vehicle.model}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Year:</label>
                        <input
                            type="number"
                            name="year"
                            value={updatedData.year || vehicle.year}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        onClick={handleUpdate}
                        className="btn bg-blue-400 text-black hover:text-white"
                    >
                        Update
                    </button>

                    <button
                        onClick={handleDelete}
                        className="btn btn-outline btn-error"
                    >
                        Delete
                    </button>
                </div >
            </div >


        </>
    );
};

export default UpdateVehicle;

// Rest of the code remains the same


export async function getServerSideProps(context) {

    const id = context.params.id;

    console.log(id);

    const response = await axios.get('http://localhost:3000/users/vehicles/' + id);
    const vehicle = await response.data;

    return { props: { vehicle } }
}