import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from './header';

function Drawer(props) {
    const [email, setEmail] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const session = sessionStorage.getItem('email');
            if (session) {
                setEmail(session);
            }
        }
    }, []);

      const handleSignOut = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.get('https://nestjs-production-0acd.up.railway.app/admin/logout');
          console.log(response.data);
          sessionStorage.removeItem('email');
          setEmail(null);
          router.push('/Admin');
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <Header title={props.title} />

            <div>
                <div className="flex justify-end p-4">
                    {/* Profile button */}
                    <Link href="#">
                        <button className="px-2 py-1 text-white bg-gray-800 rounded-md mr-2">Profile</button>
                    </Link>
                    {/* Sign Out button */}
                    <button className="px-2 py-1 text-white bg-red-500 rounded-md" onClick={handleSignOut}>Sign Out</button>
                </div>

                {/* Sidebar navigation */}
                <aside
                    id="logo-sidebar"
                    className="fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full bg-gray-900 border-r border-gray-800 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center"
                    aria-label="Sidebar"
                >
                    {/* Logo */}
                    <Link href="./dashboard">
                        <h1 className="text-white text-4xl font-bold mb-6">
                            <span className="text-yellow-400" style={{ textShadow: '1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff' }}>
                                Admin
                            </span>{" "}
                            <span className="text-gray-900" style={{ textShadow: '1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff' }}>
                                Panel
                            </span>
                        </h1>
                    </Link>

                    {/* Navigation links */}
                    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            {/* You can add more navigation links here */}
                            {/* For example: */}
                            <li>
                                <Link href="" className="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg
                                        fill="green"
                                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                        ></path>
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Add Admin
                                    </span>
                                </Link>
                            </li>
                            {/* Add more navigation links here */}
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Drawer;

