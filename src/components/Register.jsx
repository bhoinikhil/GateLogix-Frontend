import { useFormik } from "formik"
import { RegisterSchema } from "../validationSchemas/RegisterSchema";
import { getErrorMessage } from "../exceptionHandler/ErrorMessage";
import axios from "axios";
import { useState } from "react";

const initialValues = {
    name: "",
    username: "",
    password: "",
    mobileNo: "",
    role: ""
}
const Register = () => {
     const [eyeOpen, setEyeOpen] = useState(false)
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: RegisterSchema,

        onSubmit: async (values, { resetForm }) => {
            validationSchema: RegisterSchema;

            axios.post("http://localhost:8080/auth/signup", values)
                .then(alert("Account Created Successfully"), resetForm())
                .catch(error => { getErrorMessage(error) })
        }
    })
    return (
        <>
            <h3 className="text-light">SignUp</h3>
            <form action="" onSubmit={handleSubmit}>
                <input type="text"
                    placeholder='Full Name'
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='rounded-input form-control mt-2'
                />
                {touched.name && errors.name ? <p className="text-danger">{errors.name}</p> : null}
                <input type="text"
                    placeholder='Username / Email'
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='rounded-input form-control mt-2'
                />
                {touched.username && errors.username ? <p className="text-danger">{errors.username}</p> : null}
                <div className="position-relative">
                    <input type={eyeOpen?"text":"password"}
                        placeholder='Create Password'
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='rounded-input form-control mt-2'
                    />
                    <span className='pwd-eye-btn' >
                        <button onClick={() => { setEyeOpen(!eyeOpen) }} className='btn border-0 fs-5'>
                            <i className={`bi text-light text-bold  ${eyeOpen ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </button >
                    </span>
                </div>
                {touched.password && errors.password ? <p className="text-danger ">{errors.password}</p> : null}
                <input type="text"
                    placeholder='Mobile Number'
                    name="mobileNo"
                    value={values.mobileNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='rounded-input form-control mt-2'
                />
                {touched.mobileNo && errors.mobileNo
                    ? <p className="text-danger">{errors.mobileNo}</p> : null
                }
                <select
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="role"
                    className="rounded-input form-control mt-2">
                    <option value="" className="text-dark" >Select role</option>
                    <option value="SECRETARY" className="text-dark" >Society Secretary</option>
                    <option value="GUARD" className="text-dark" >Security Guard</option>
                </select>
                {touched.role && errors.role ? <p className="text-danger">{errors.role}</p> : null}
                <button type='submit' className='btn btn-warning w-100 mt-2'>Submit</button>
                <span className='text-decoration-none' onClick={() => { set }}>Already have a account</span>
            </form>
        </>
    )
}

export default Register
