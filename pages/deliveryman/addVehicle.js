import { useForm } from 'react-hook-form';
import axios from "axios"
import { useState, useEffect } from "react"

function AddVehicle() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [user, setUser] = useState(null);
      const [email, setEmail] =useState("")
   
      useEffect(() => {
        loadUser();
      }, []);

    const loadUser = async () => {
        const UserEmail=sessionStorage.getItem('email')
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
            <section>
            <div>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="#">
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <h1 className='font-bold text-black text-xl'>Add New Vehicle</h1>
                                    <p>{success}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Company</label>
                                </td>
                                <td>
                                    <input type="text" {...register('company', { required: true })} />
                                    {errors.company && <p>This field is required</p>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Model</label>
                                </td>
                                <td>
                                    <input type="text" {...register('model', { required: true })} />
                                    {errors.model && <p>This field is required</p>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Year</label>
                                </td>
                                <td>
                                    <input type="number" {...register('year', { required: true })} />
                                    {errors.year && <p>This field is required</p>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button type="submit">Add Vehicle</button>
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

// export async function getServerSideProps(context) {

   

//     const response = await axios.get('http://localhost:3000/users/findUserByEmail',email);
//     const user = await response.data;

//     return { props: { user } }
// }


export default AddVehicle;
