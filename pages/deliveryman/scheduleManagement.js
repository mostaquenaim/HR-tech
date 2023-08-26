import Drawer from '../components/drawer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import SessionCheck from '../components/sessionCheck';

export default function ScheduleManagement() {
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

        const result = await axios.get('http://localhost:3000/users/schedule', email);

        console.log(result.data);
        setUsers(result.data);
        console.log("usersss", users)

    };

    const router = useRouter();


    const handleModelClick = (userId) => {
        router.push(`/deliveryman/updateSchedule/${userId}`);
    };


    return (
        <>
            <SessionCheck />
            <section className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="mb-6">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Schedules</h1>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user, index) => (
                            <div key={user.id} className={`p-4 shadow-md hover:shadow-lg hover:shadow-black rounded-lg ${index % 2 === 0 ? 'bg-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                <div>
                                    <div>{/* Empty div for numbering */}</div>
                                    <h3 className="font-semibold">Day</h3>
                                    <h2
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleModelClick(user.id)}
                                        className="flex items-center"
                                    >
                                        <span className="mr-2">{index + 1}.</span> {/* Add numbering */}
                                        <span>{user.Day}</span>
                                    </h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>





        </>
    );
}

