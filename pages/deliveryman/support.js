import { useForm } from 'react-hook-form';
import axios from "axios"
import { useState, useEffect } from "react"

function Support() {
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
            <section>
            <div>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="#">
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <h1 className='font-bold text-black text-xl'>Ask for support</h1>
                                    <p>{success}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Support</label>
                                </td>
                                <td>
                                    <input type="text" {...register('support', { required: true })} />
                                    {errors.support && <p>This field is required</p>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button type="submit">Submit</button>
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
