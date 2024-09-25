import React, { useRef, useState } from 'react';

const CustomUnControlledForm = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const contactRef = useRef(null);
  const cityRef = useRef(null);
  const resumeRef = useRef(null);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    contact: '',
    city: '',
    resume: ''
  })

  const submitHandler = (event) => {
    event.preventDefault();

    let firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const age = ageRef.current.value;
    const gender = genderRef.current.value;
    const contact = contactRef.current.value;
    const city = cityRef.current.value;
    const resume = resumeRef.current.files[0];

    const newErrors = {};

    if (!firstName || !firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (firstName.length < 3) {
      newErrors.firstName = "Minimum 3 characters are required";
    }
    

    if (!lastName || !lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (lastName.length < 3) {
      newErrors.lastName = "Minimum 3 characters are required";
    }

    if (!email || !email.trim()) {
      newErrors.email = "Email is Required";
    } else if (!email.includes('@')) {
      errors.email = "Invalid email";
    }

    if (!age) {
      newErrors.age = "Age is required";
    } else if (age < 18 || age > 60) {
      newErrors.age = "Invalid Age"
    }

    if (!gender) {
      newErrors.gender = "Gender is required";
    } 

    if (!city) {
      newErrors.city = "City is required";
    }

    if (!contact) {
      newErrors.contact = "Contact is required";
    } else if (contact.length < 10) {
      newErrors.contact = "Invalid contact";
    }
    if (!resume) {
      newErrors.resume = "Resume is required";
    } else if (resume.size > 5242880) {
      newErrors.resume = "Minimum 5mb file is required"
    }

    setErrors(newErrors);
    // firstNameRef.current.value = "";
    // lastNameRef.current.value = "";
    // emailRef.current.value = "";
    // ageRef.current.value = "";
    // genderRef.current.value = "";
    // contactRef.current.value = "";
    // cityRef.current.value = "";
    // resumeRef.current.value = "";

  }

  return (
    <div className='container h-[100] w-[100] flex flex-col justify-center items-center '>
      <h2 className='py-3 font-bold'>Form using UnControlled Components - Custom Validations</h2>
      <form className='flex flex-col gap-y-3 bg-gray-100' onSubmit={submitHandler}>

        <div className='flex flex-col items-center'>
          <label htmlFor="firstName" className='font-semibold text-gray-700'>First Name</label>
          <input type='text' id='firstName' className='rounded-lg w-40' ref={firstNameRef} />
        </div>
        {errors.firstName &&
          <p className='text-red-600  py-1'> {errors.firstName} </p>
        }
        <div className='flex flex-col items-center'>
          <label htmlFor='lastName' className='font-semibold text-gray-700'>Last Name</label>
          <input type='text' id='lastName' className='rounded-lg w-40' ref={lastNameRef} />
        </div>
        {errors.lastName &&
          <p className='text-red-600  py-1'> {errors.lastName} </p>
        }
        <div className='flex flex-col items-center' >
          <label htmlFor='email' className='font-semibold text-gray-700'>Email</label>
          <input type='email' id='email' className='rounded-lg w-40' ref={emailRef} />
        </div>
        {errors.email &&
          <p className='text-red-600  py-1'> {errors.email} </p>
        }
        <div className='flex flex-col items-center'>
          <label htmlFor='age' className='font-semibold text-gray-700'>Age</label>
          <input type='number' id='age' className='rounded-lg w-40' ref={ageRef} />
        </div>
        {errors.age &&
          <p className='text-red-600  py-1'> {errors.age} </p>
        }
        <div className='flex flex-col items-center'>
          <label htmlFor='gender' className='font-semibold text-gray-700'>Gender</label>
          <select id="gender" className='rounded-lg w-40' ref={genderRef}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        {errors.gender &&
          <p className='text-red-600  py-1'> {errors.gender} </p>
        }
        <div className='flex flex-col items-center'>
          <label htmlFor='contact' className='font-semibold text-gray-700'>Contact</label>
          <input className='rounded-lg w-40' type='text' id='contact' ref={contactRef} />
        </div>
        {errors.contact &&
          <p className='text-red-600  py-1'> {errors.contact} </p>
        }
        <div className='flex flex-col items-center'>
          <label htmlFor='city' className='font-semibold text-gray-700'>Select your City</label>
          <select id='city' className='rounded-lg w-40' ref={cityRef}>
            <option value="">Select</option>
            <option value="asr">Amritsar</option>
            <option value="hsp">Hoshiarpur</option>
            <option value="jal">Jalandhar</option>
          </select>
        </div>
        {errors.city &&
          <p className='text-red-600  py-1'> {errors.city} </p>
        }
        <div className='flex flex-col items-center'>
          <label htmlFor='file' className='font-semibold text-gray-700'>Resume</label>
          <input type='file' id='file' accept='.pdf' ref={resumeRef} />
        </div>
        {errors.resume &&
          <p className='text-red-600  py-1'> {errors.resume} </p>
        }
        <button type='submit' className='bg-blue-600 w-20 h-8 rounded-md font-bold text-white mx-40 hover:shadow-lg bg-blue-700'>Submit</button>

      </form>
    </div>
  )
}

export default CustomUnControlledForm;
