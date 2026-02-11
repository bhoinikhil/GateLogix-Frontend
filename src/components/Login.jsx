import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../exceptionHandler/ErrorMessage';
import { useAuth } from '../context/AuthContext';
import { loginSchema } from '../validationSchemas/LoginSchema';
import axios from 'axios';

const initialValues = {
    username: "",
    password: ""
}
const Login = () => {
    const [eyeOpen, setEyeOpen] = useState(false)
    const { login } = useAuth();
    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await axios.post("http://localhost:8080/auth/login", values)
                const token = res.data;
                login(token)  // from useAuth()
                const decodedRole = jwtDecode(token).role;
                console.log(decodedRole);
                if (decodedRole === "ROLE_SECRETARY") {
                    navigate("/resident", { replace: true })
                } else if (decodedRole === "ROLE_GUARD") {
                    navigate("/gard_dashboard", { replace: true })
                } else {
                    navigate("/", { replace: true })
                }
                resetForm()
            } catch (error) {
                alert(getErrorMessage(error))
            }
        }
    })
    return (
        <>
            <h3 className='text-center text-light '>Login</h3>
            <form onSubmit={handleSubmit}>

                <input type="text"
                    name='username'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Username'
                    className='px-2 rounded-input form-control mt-2 ' />
                {touched.username && errors.username ? <p className='text-danger'>{errors.username}</p> : null}
                <div className='position-relative '>
                    <input type={eyeOpen ? "text" : "password"}
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Password'
                        className='px-2 rounded-input form-control mt-2 ' />
                    <span className='pwd-eye-btn' ><button onClick={() => { setEyeOpen(!eyeOpen) }} className='btn border-0 fs-5'>
                        <i className={`bi text-light text-bold  ${eyeOpen ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button ></span>
                    {touched.password && errors.password ? <p className='text-danger' >{errors.password}</p> : null}
                </div>
                <div className=' text-end'> <a href="#" className='text-decoration-none text-warning  '>Forget Passward?</a></div>
                <button type='submit' className='btn btn-warning w-100 mt-2'>Login</button>
                <div>I don't have account <a href="# " className='text-decoration-none text-warning'>SignUp</a></div>
            </form>
        </>
    )
}

export default Login
