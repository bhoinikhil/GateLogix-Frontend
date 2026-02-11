import { useForm } from 'react-hook-form'
import Axios from 'axios';
import { useState } from 'react';
import { getErrorMessage } from '../exceptionHandler/ErrorMessage';
import api from './Api';
import { useFormik } from 'formik';
import { VehicalSchema } from '../validationSchemas/VehicalSchema';

const initialValues = {
    vName: "",
    registerationNumber: "",
    type: "",
    color: ""
}

const AddVehicleToResident = () => {
    const [residentEmail, setResidentEmail] = useState("");
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: VehicalSchema,
        onSubmit: (values, { resetForm }) => {
            const updatedVehical = {
                ...values,
                VehicleActive: true,
            }
            api.put("/addVehicle", updatedVehical, {
                params: {
                    email: residentEmail
                }
            }).then(alert("Vehical Added to the Resident with email ", residentEmail), resetForm(), setResidentEmail(""))
                .catch(error => {
                    alert(getErrorMessage(error))
                });

        }
    })


    return (
        <div className="row px-2 ">
            <div className="col-12 py-3 shadow rounded ">
                <h4 className='text-center p-2'>Add Resident Vehicle</h4>
                <hr />
                <h5>{residentEmail} </h5>
                <form onSubmit={handleSubmit} action="">
                    {/* Resident email */}
                    <div className="row">
                        <div className="col-12 mt-2">
                            <label htmlFor="residentEmail">Resident Email</label>
                            <input type="email"
                                className='form-control'
                                onChange={(e) => { setResidentEmail(e.target.value) }} />
                        </div>
                    </div>
                    {/* vehical name */}
                    <div className="row">
                        <div className="col-12 mt-3">
                            <label htmlFor="vName">Vehical</label>
                            <input type="text"
                                name='vName'
                                value={values.vName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control' />
                            {touched.vName && errors.vName ? <p className='text-danger'>{errors.vName}</p> : null}
                        </div>
                    </div>
                    {/* Registration Number */}
                    <div className="row">
                        <div className="col-12 mt-3">
                            <label htmlFor="regNo">Registration Number</label>
                            <input type="text"
                                name='registerationNumber'
                                value={values.registerationNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control'
                                placeholder='e.g. MH12AB1234' />
                            {touched.registerationNumber && errors.registerationNumber ? <p className='text-danger'>{errors.registerationNumber}</p> : null}
                        </div>
                    </div>
                    {/* Type of Vehical */}
                    <div className="row ">
                        <div className="col-12 mt-3">
                            <label htmlFor="vType">Type of Vehical</label>
                            <select
                                name="type"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control'>
                                <option value="" >Select Type of Vehical</option>
                                <option value="BIKE" >Bike</option>
                                <option value="MOPED" >Scooty</option>
                                <option value="CAR" >Car</option>
                            </select>
                            {touched.type && errors.type ? <p className='text-danger'>{errors.type}</p> : null}
                        </div>
                    </div>
                    {/* Vehical color */}
                    <div className="row ">
                        <div className="col-12 mt-3">
                            <label htmlFor="vcolor">Vehical Color</label>
                            <input type="text"
                                name='color'
                                value={values.color}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-control' />
                            {touched.color && errors.color ? <p className='text-danger'>{errors.color}</p> : null}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <input type="submit" className='btn btn-primary form-control' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddVehicleToResident
