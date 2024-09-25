import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";

const UnControlledForm = () => {

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    age: Yup.number().required("Age is required").positive("Age must be positive").integer(),
    gender: Yup.string().required("Gender is required"),
    contact: Yup.string().required("Contact is required").matches("^[0-9]{10}$", "Invalid contact"),
    city: Yup.string().required("City is required"),
    file: Yup.mixed()
      .required('A file is required').test('file size', 'File size should be less than 5mb', value => {
        if (value) {
          return value && value[0].size <= 5242880
        }
      })
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const contactRef = useRef(null);
  const cityRef = useRef(null);
  const fileRef = useRef(null);




  const onSubmit = (data) => {
    console.log("consoling the form data here --->>>>", data);
    alert("Form Submitted Successfully!!!");
    resetField("firstName");
    resetField("lastName");
    resetField("email");
    resetField("age");
    resetField("gender");
    resetField("contact");
    resetField("city");
    resetField("file");
  }
  return (
    <div className='container h-[100] w-[100] flex flex-col justify-center items-center'>
      <h2 className='py-3 font-bold'>Form using UnControlled Components</h2>
      <form className='flex flex-col gap-y-3 bg-gray-100' onSubmit={handleSubmit(onSubmit)}>

        <div className='flex flex-col items-center'>
          <label className='font-semibold text-gray-700'>First Name</label>
          <input type='text' className='rounded-lg w-40' ref={firstNameRef} {...register('firstName')} />
        </div>
        {errors.firstName &&
          <p className='text-red-600  py-1'>{errors.firstName.message}</p>
        }

        <div className='flex flex-col items-center'>
          <label className='font-semibold text-gray-700'>Last Name</label>
          <input type='text' className='rounded-lg w-40' ref={lastNameRef} {...register('lastName')} />
        </div>
        {errors.lastName &&
          <p className='text-red-600  py-1'> {errors.lastName.message}</p>
        }
        <div className='flex flex-col items-center' >
          <label className='font-semibold text-gray-700'>Email</label>
          <input type='email' className='rounded-lg w-40' ref={emailRef} {...register('email')} />
        </div>
        {errors.email &&
          <p className='text-red-600  py-1'> {errors.email.message} </p>
        }
        <div className='flex flex-col items-center'>
          <label className='font-semibold text-gray-700'>Age</label>
          <input type='number' className='rounded-lg w-40' ref={ageRef} {...register('age')} />
        </div>
        {errors.age &&
          <p className='text-red-600  py-1'> {errors.age.message} </p>
        }
        <div className='flex flex-col items-center'>
          <label className='font-semibold text-gray-700'>Gender</label>
          <select className='rounded-lg w-40' ref={genderRef} {...register('gender')}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        {errors.gender &&
          <p className='text-red-600  py-1'> {errors.gender.message} </p>
        }
        <div className='flex flex-col items-center'>
          <label className='font-semibold text-gray-700'>Contact</label>
          <input className='rounded-lg w-40' type='text' ref={contactRef} {...register('contact')} />
        </div>
        {errors.contact &&
          <p className='text-red-600  py-1'> {errors.contact.message} </p>
        }
        <div className='flex flex-col items-center'>
          <label className='font-semibold text-gray-700'>Select your City</label>
          <select className='rounded-lg w-40' ref={cityRef} {...register('city')} >
            <option value="">Select</option>
            <option value="asr">Amritsar</option>
            <option value="hsp">Hoshiarpur</option>
            <option value="jal">Jalandhar</option>
          </select>
        </div>
        {errors.city &&
          <p className='text-red-600  py-1'> {errors.city.message} </p>
        }
        <div className='flex flex-col items-center'>
          <label className='font-semibold text-gray-700'>Resume</label>
          <input type='file' ref={fileRef} {...register('file')} />
        </div>
        {errors.file &&
          <p className='text-red-600  py-1'> {errors.file.message} </p>
        }
        <button type='submit' className='bg-blue-600 w-20 h-8 rounded-md font-bold text-white mx-40 hover:shadow-lg bg-blue-700' disabled={isSubmitting}>Submit</button>

      </form>

    </div>
  )
}

export default UnControlledForm;
