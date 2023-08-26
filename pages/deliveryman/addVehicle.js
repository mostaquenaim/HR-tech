import { useForm } from 'react-hook-form';
import axios from "axios"
import { useState, useEffect } from "react"
import SessionCheck from '@/pages/components/sessionCheck';

function AddVehicle() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("")

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const UserEmail = sessionStorage.getItem('email')
        setEmail(UserEmail)

        const result = await axios.get('http://localhost:3000/users/findUserByEmail', email);

        setUser(result.data);
    };


    const [success, setSuccess] = useState('')

    const onSubmit = async (data) => {
        console.log("came")
        try {
            const response = await axios.post(`http://localhost:3000/users/${user.id}/vehicles`, data);
            console.log('User created:', response.data);

            setSuccess('vehicle added successfully');
            reset();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            <SessionCheck />
            <section className="text-gray-600 body-font ">
                <div className="container mx-auto bg-gradient-to-b from-zinc-50 to-blue-100 h-screen">
                    <div className="flex flex-wrap w-full mb-20 justify-center">
                        <div className="w-full mb-6">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Add New Vehicle</h1>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="#" className="w-96 bg-white p-5 shadow-md rounded-lg">
                            <div className="my-2">
                                <label className="block font-semibold">Company:</label>
                                <input
                                    type="text"
                                    {...register('company', { required: true })}
                                    className="border p-1 rounded w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.company && <p className="text-red-500">This field is required</p>}
                            </div>
                            <div className="my-2">
                                <label className="block font-semibold">Model:</label>
                                <input
                                    type="text"
                                    {...register('model', { required: true })}
                                    className="border p-1 rounded w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.model && <p className="text-red-500">This field is required</p>}
                            </div>
                            <div className="my-2">
                                <label className="block font-semibold">Year:</label>
                                <input
                                    type="number"
                                    {...register('year', { required: true })}
                                    className="border p-1 rounded w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.year && <p className="text-red-500">This field is required</p>}
                            </div>
                            <button
                                type="submit"
                                className="btn bg-blue-400 text-black hover:text-white hover:bg-blue-600 transition duration-300 mt-4"
                            >
                                Add Vehicle
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
}

// export async function getServerSideProps(context) {



//     const response = await axios.get('http://localhost:3000/users/findUserByEmail',email);
//     const user = await response.data;

//     return { props: { user } }
// }


export default AddVehicle;
