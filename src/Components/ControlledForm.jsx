import React, { useState } from 'react';
import { useRef } from 'react';
import * as Yup from 'yup';

const ControlledForm = () => {
    const fileref = useRef(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        gender: '',
        contact: '',
        city: '',
        file: ''
        // hobbies: []

    })
    // step 1 of defining the schemaa
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        age: Yup.number().required("Age is required").positive("Age must be positive").integer(),
        gender: Yup.string().required("Gender is required"),
        contact: Yup.string().matches("^[0-9]{10}$", "Invalid contact").required("Contact is required"),
        city: Yup.string().required("City is required"),
        // hobbies: Yup.array().min(1, "Select atleast one").required("Please choose atleast one")
        file: Yup.mixed()
            .required('A file is required').test('file size', 'File size should be less than 5mb', value => {
                if (value) {
                    return value.size <= 5242880
                }
            })
    });


    const submitHandler = async (event) => {
        event.preventDefault();
        //second step 
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            alert("Form Submitted Successfully!!");
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                age: '',
                gender: '',
                contact: '',
                city: '',
                file: ''
                // hobbies: []
            });
            fileref.current.value = "";
            setErrors({});
            console.log("form data --->>>", formData);

        } catch (error) { // step - 2 if got any error
            const newErrors = {};
            error.inner.forEach(
                (err) => newErrors[err.path] = err.message,
            );
            console.log("new errors here --->>>", error.inner);
            setErrors(newErrors);
        }
    }
    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? event.target.files[0] : value
        });
    }
    const handleChangeCheckbox = (event) => {
        const { name, checked } = event.target;
        let updatedHobbies = [...formData.hobbies];
        if (checked) {
            // if the checkbos has been checked or not
            updatedHobbies.push(name);
        }
        else {
            updatedHobbies.filter((hobby) => hobby !== name);
        }
        setFormData(
            {
                ...formData,
                hobbies: updatedHobbies
            }

        );
    }
    return (
        <div className='container h-[100] w-[100] flex flex-col justify-center items-center '>
            <h2 className='py-3 font-bold'>Form using Controlled Components</h2>
            <form onSubmit={submitHandler} className='flex flex-col gap-y-2 bg-gray-100'>
                <div className='flex flex-col items-center'>
                    <label htmlFor='firstName' className='font-semibold text-gray-700'>First Name </label>
                    <input className='rounded-lg w-40' type='text' name='firstName' id='firstName' value={formData.firstName} onChange={handleChange} />
                </div>
                {errors.firstName &&
                    <p className='text-red-600  py-1'> {errors.firstName} </p>
                }
                <div className='flex flex-col items-center '>
                    <label htmlFor='lastName' className='font-semibold text-gray-700 '>Last Name</label>
                    <input className='rounded-lg w-40' type='text' name='lastName' id='lastName' value={formData.lastName} onChange={handleChange} />
                </div>
                {errors.lastName &&
                    <p className='text-red-600  py-1'> {errors.lastName} </p>
                }

                <div className='flex flex-col items-center'>
                    <label htmlFor='email' className='font-semibold text-gray-700'>Email</label>
                    <input className='rounded-lg w-40' type='email' name='email' id='email' value={formData.email} onChange={handleChange} />
                </div>
                {errors.email &&
                    <p className='text-red-600  py-1'> {errors.email} </p>
                }

                <div className='flex flex-col items-center'>
                    <label htmlFor="age" className='font-semibold text-gray-700'>Age</label>
                    <input className='rounded-lg w-40' type="number" name='age' id='age' value={formData.age} onChange={handleChange} />
                </div>
                {errors.age &&
                    <p className='text-red-600  py-1'> {errors.age} </p>
                }

                <div className='flex flex-col items-center'>
                    <label htmlFor='gender' className='font-semibold text-gray-700'>Gender</label>
                    <select name="gender" id="gender" onChange={handleChange} className='rounded-lg w-40' value={formData.gender}>
                        <option value="" disabled>Select</option>
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
                    <input className='rounded-lg w-40' type='text' name='contact' id='contact' value={formData.contact} onChange={handleChange} />
                </div>
                {errors.contact &&
                    <p className='text-red-600  py-1'> {errors.contact}</p>
                }

                <div className='flex flex-col items-center'>
                    <label htmlFor='city' className='font-semibold text-gray-700'>Select your City</label>
                    <select name='city' id='city' value={formData.city} onChange={handleChange} className='rounded-lg w-40'>
                        <option value="" disabled>Select</option>
                        <option value="asr">Amritsar</option>
                        <option value="hsp">Hoshiarpur</option>
                        <option value="jal">Jalandhar</option>
                    </select>
                </div>
                {errors.city &&
                    <p className='text-red-600  py-1'> {errors.city} </p>
                }
                {/* 
                <div className='flex flex-col items-center'>
                    <label htmlFor="hobbies" className='font-semibold'>Choose your hobbies</label>
                    <div className='flex flex-row gap-x-3'>

                        <label>
                            <input type='checkbox' name='coding' checked={formData.hobbies.includes("coding")} onChange={handleChangeCheckbox} />
                            Coding
                        </label>
                        <label>
                            <input type='checkbox' name='sports' checked={formData.hobbies.includes("sports")} onChange={handleChangeCheckbox} />
                            Sports
                        </label>
                        <label>
                            <input type='checkbox' name='reading' checked={formData.hobbies.includes("reading")} onChange={handleChangeCheckbox} />
                            Reading
                        </label>
                    </div>
                </div> */}
                {/* <p style={{ color: 'red' }}> {errors.hobbies} </p> */}
                <div className='flex flex-col items-center'>
                    <label htmlFor='file' className='font-semibold text-gray-700'>Resume</label>
                    <input type='file' name='file' id='file' accept='.pdf' onChange={handleChange} ref={fileref} />
                </div>
                {errors.file &&
                    <p className='text-red-600  py-1'>{errors.file}</p>
                }
                <button type='submit' className='bg-blue-600 w-20 h-8 rounded-md font-bold text-white mx-40 hover:shadow-lg bg-blue-700'>Submit</button>
            </form>
        </div>


    )
}

export default ControlledForm;
