import Drawer from '../components/drawer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import SessionCheck from '../components/sessionCheck';

export default function deliveryman() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("")

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        const UserEmail = sessionStorage.getItem('email')

        setEmail(UserEmail)

        const result = await axios.get('http://localhost:3000/users/vehicles', email);
        console.log(result.data);
        setUsers(result.data);
        console.log("usersss", users)

    };

    const [inputValue, setInputValue] = useState();
    const router = useRouter();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // redirect to the same page with query params containing the input value


        router.push({
            pathname: 'findusers',
            query: { inputValue: inputValue }
        });
    }

    const handleModelClick = (userId) => {
        router.push(`/deliveryman/updateVehicle/${userId}`);
    };


    return (
        <>
            <SessionCheck />
            <section className="bg-gradient-to-b from-zinc-50 to-blue-100 min-h-screen flex justify-center items-center">
                <div className="container mx-auto bg-white shadow-md hover:shadow-lg hover:shadow-black p-6 rounded-lg">
                    <div className="text-center mb-4">
                        <h1 className="font-bold text-xl">Vehicles</h1>
                    </div>
                    <div>
                        {users.map((user) => (
                            <div key={user.id} className="mb-4">
                                <div className="border p-4 rounded hover:bg-gray-200 cursor-pointer">
                                    {console.log(user.image)}
                                    <div className="mb-2">
                                        <h3 className="font-semibold">Model</h3>
                                        <h2
                                            className="text-blue-500 hover:underline cursor-pointer"
                                            onClick={() => handleModelClick(user.id)}
                                        >
                                            {user.model}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>




        </>
    );
}

// export async function getServerSideProps({ query }) {
//     const inputValue = query.inputValue;
//     try {
//         const response = await axios.get('https://nestjs-production-0acd.up.railway.app/admin/findcustomer/' + inputValue);
//         const data = await response.data;

//         return {
//             props: {
//                 data
//             }
//         };

//     } catch (error) {

//         return {
//             props: {
//                 data: { status: "enter valid customer id" }
//             }
//         };
//     }
// }