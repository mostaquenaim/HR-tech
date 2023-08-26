import { useForm } from 'react-hook-form';
import axios from "axios"
import { useState, useEffect } from "react"
import SessionCheck from '@/pages/components/sessionCheck';

function Support() {
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
            const response = await axios.post(`http://localhost:3000/users/${user.id}/support`, data);
            console.log('User created:', response.data);

            setSuccess('successful');
            reset();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            <SessionCheck />
            <section className="bg-gray-100 dark:bg-gray-800 h-screen flex justify-center items-center">
                <div className="container mx-auto bg-white shadow-md hover:shadow-lg hover:shadow-black p-6 rounded-lg">
                    <div className="text-center mb-4">
                        <h1 className="font-bold text-xl">Ask for Support</h1>
                        <p className="text-red-500">{success}</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="#">
                        <table className="mx-auto">
                            <tbody>
                                <tr>
                                    <td colSpan="2">
                                        <label className="block text-black text-xl font-bold mb-2">Support</label>
                                        <textarea
                                            type="text"
                                            {...register('support', { required: true })}
                                            className="border p-1 rounded w-full focus:outline-none focus:border-blue-500"
                                        />
                                        {errors.support && <p className="text-red-500">This field is required</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-center mt-4">
                                        <button
                                            type="submit"
                                            className="btn bg-blue-400 text-black hover:text-white transition-colors duration-300 ease-in-out"
                                        >
                                            Submit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </section>

        </>
    );
}


export default Support;
