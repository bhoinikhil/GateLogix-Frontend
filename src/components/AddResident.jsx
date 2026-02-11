import React, { useState } from 'react'

import { getErrorMessage } from '../exceptionHandler/ErrorMessage';

import api from "./Api";
import { useFormik } from 'formik';
import { ResidentSchema } from '../validationSchemas/ResidentSchema';

const initialValues = {
    fName: "",
    lName: "",
    flatNo: "",
    mobileNo: "",
    email: "",
    residentType: ""
}

const AddResident = () => {

    const { errors, handleSubmit, handleChange, handleBlur, touched, resetForm, values } = useFormik({
        initialValues: initialValues,
        validationSchema: ResidentSchema,
        onSubmit:(values,{resetForm}) =>{
             api.post("/addNewResident", values)
            .then(alert("Resident saved Successfully"),resetForm())
            .catch(error => { alert(getErrorMessage(error)) })
        }
    })
   
    return (
        <div className="row  ">
            <div className="col-12 py-3 px-3 shadow rounded">
                <h4 className='text-center p-2'>Add New Resident</h4>
                <hr />
                <form onSubmit={handleSubmit} action="">
                    <div className="row mt-4">
                        {/* first name */}
                        <div className="col-12 col-md-6">
                            <label htmlFor="fName ">First Name</label>
                            <input type="text" id='fName'
                                name='fName'
                                value={values.fname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control' />
                            {touched.fName && errors.fName ? <p className='text-danger' >{errors.fName}</p> : null}
                        </div>
                        {/* last name */}
                        <div className="col-12 col-md-6">
                            <label htmlFor="lName">Last Name</label>
                            <input type="text" id='lName'
                                name='lName'
                                value={values.lName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control' />
                            {touched.lName && errors.lName ? <p className='text-danger' >{errors.lName}</p> : null}

                        </div>
                    </div>
                    {/* flat no , mobile no */}
                    <div className="row mt-4">
                        <div className="col-12 col-md-6">
                            <label htmlFor="flatNo">Flat Number</label>
                            <input type="text"
                                name='flatNo'
                                value={values.flatNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control' />
                            {touched.flatNo && errors.flatNo ? <p className='text-danger' >{errors.flatNo}</p> : null}
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="mobileNo">Mobile Number</label>
                            <input type="tel"
                                name='mobileNo'
                                value={values.mobileNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control' />
                            {touched.mobileNo && errors.mobileNo ? <p className='text-danger' >{errors.mobileNo}</p> : null}

                        </div>
                    </div>
                    {/* email */}
                    <div className="row mt-4">
                        <div className="col-12 col-md-10">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control' />
                            {touched.email && errors.email ? <p className='text-danger' >{errors.email}</p> : null}
                        </div>
                    </div>
                    {/* Resident type */}
                    <div className="row mt-4">
                        <div className="col-12">
                            <label htmlFor="type">Resident Type</label>
                            <select name="residentType" id="type"
                                value={values.residentType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control' >
                                <option value="" >Select Resident type</option>
                                <option value="OWNER" >Owner</option>
                                <option value="TENANT" >Tenant</option>
                            </select>
                            {touched.residentType && errors.residentType ? <p className='text-danger' >{errors.residentType}</p> : null}

                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-5 mx-auto">
                            <input type="submit" className='btn btn-primary form-control' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddResident;
