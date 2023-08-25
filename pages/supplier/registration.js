import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function CreateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Adjust the URL to match your local API endpoint
      const response = await axios.post(`http://localhost:3000/${data.id}/profiles`, data);
      console.log('Profile created:', response.data);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };
  

  return (
    <div>
      <h1>Create New Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input type="text" {...register('firstName', { required: true })} />
        {errors.firstName && <p>This field is required</p>}

        <label>Last Name</label>
        <input type="text" {...register('lastName', { required: true })} />
        {errors.lastName && <p>This field is required</p>}

        <label>Age</label>
        <input type="number" {...register('age', { required: true, min: 0 })} />
        {errors.age && <p>This field is required and must be a positive number</p>}

        <label>Date of Birth</label>
        <input type="date" {...register('dob', { required: true })} />
        {errors.dob && <p>This field is required</p>}

        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}

export default CreateProfile;
