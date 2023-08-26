import Drawer from '../components/drawer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import SessionCheck from '../components/sessionCheck';

export default function deliveryman( ) {
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
          <section>
      <div>
        <div>
          <h1>Vehicles</h1>
          <div></div>
        </div>
        <p></p>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <div>
              {console.log(user.image)}
              <div></div>
              <h3>Model</h3>
              <h2
                style={{ cursor: 'pointer' }}
                onClick={() => handleModelClick(user.id)}
              >
                {user.model}
              </h2>
            </div>
          </div>
        ))}
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