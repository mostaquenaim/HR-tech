import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import SessionCheck from '../components/sessionCheck';
import Drawer from '../components/drawer';

const DeliverymanProfile = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [user, setUser] = useState({});
    const [email, setEmail] = useState("")

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const UserEmail = sessionStorage.getItem('email')
        console.log("email",)
        setEmail(UserEmail)

        const result = await axios.get(`http://localhost:3000/users/findUserByEmail/${UserEmail}`);

        setUser(result.data);
    };

    const [updatedData, setUpdatedData] = useState({});
    const router = useRouter();

    const [success, setSuccess] = useState('')

    const handleUpdate = async () => {
        try {
            updatedData.email = user.email
            console.log(updatedData)
            await axios.put(`http://localhost:3000/users/update/${user.id}`, updatedData);
            setSuccess('Admin update successfully');
        }
        catch (error) {
            setSuccess('Error updating user:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <Drawer title="Update Profile" />
            <SessionCheck />
            <div className="flex flex-col justify-center items-center text-center bg-gradient-to-b from-zinc-50 to-blue-100 h-full">
                <div className="p-5 bg-white shadow-md shadow-black w-96 flex flex-col gap-3 rounded-lg">
                    <h1 className="text-xl font-bold">Update User</h1>
                    <p>{success}</p>
                    <div className="my-2">
                        {user.filename && (
                            <img
                                src={"http://localhost:3000/users/getImage/"+user.filename}
                                alt="User Image"
                                onError={(e) => {
                                    console.error("Error loading image:", e);
                                }}
                            />
                        )}
                    </div>
                    <div className="my-2">
                        <button className='btn'><a href='changeImage'>change image</a>  </button>
                    </div>
                    <div className="my-2">
                        <label className="block">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={updatedData.firstName || user.firstName}
                            onChange={handleInputChange}
                            className="border p-1 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="my-2">
                        <label className="block">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={updatedData.lastName || user.lastName}
                            onChange={handleInputChange}
                            className="border p-1 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="my-2">
                        <label className="block">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={updatedData.username || user.username}
                            onChange={handleInputChange}
                            className="border p-1 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="my-2">
                        <label className="block">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={updatedData.password || user.password}
                            onChange={handleInputChange}
                            className="border p-1 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* <div className="my-2">
                        <label className="block">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            className="border p-1 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div> */}
                    <button
                        onClick={handleUpdate}
                        className="btn bg-blue-400 text-black hover:text-white"
                    >
                        Update
                    </button>

                </div>
            </div>


        </>
    );
};

export default DeliverymanProfile;

// Rest of the code remains the same

