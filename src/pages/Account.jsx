import axios from 'axios'
import React, { useState } from 'react'
import { getErrorMessage } from '../exceptionHandler/ErrorMessage'
import { jwtDecode } from 'jwt-decode'
import { replace, useNavigate } from 'react-router-dom'
import { getRole } from '../components/Auth'
import { useAuth } from '../context/AuthContext'
import { useFormik } from 'formik'
import { loginSchema } from '../validationSchemas/LoginSchema'
import Register from '../components/Register'
import Login from '../components/Login'




const Account = () => {
    const [isLogin, setIsLogin] = useState(true)
    
  
    return (
        <>
            <div className="container-fluid cloud-alloy min-height ">
                <div className="row px-4 ">
                    <div className="col-12 col-lg-4 col-sm-6 glass-card border shadow p-4 mx-auto my-5 rounded overflow-hidden">
                        <div className="row ">
                            {/* Top Button section */}
                            <div className="row ">
                                <div className="col-6  p-2 text-end ">
                                    <button className={isLogin ? "active btn btn-primary w-50 " : "btn outline-primary w-50"} onClick={() => { setIsLogin(true) }}>Login</button>
                                </div>
                                <div className="col-6  p-2 ">
                                    <button className={!isLogin ? "active btn btn-primary w-50 " : " btn outline-primary w-50"} onClick={() => { setIsLogin(false) }}>SignUp</button>
                                </div>
                            </div>
                            {/* Bottom form section */}
                            <div className="row mx-auto ">
                                {
                                    isLogin ? <>
                                        {/* Login form section */}
                                        <div className=' col-12 text-center  '>
                                           <Login/>  {/*   login component   */}
                                        </div>
                                    </> : <>
                                        {/* SignUp form section */}
                                        <div className=' col-12 text-center'>
                                            <Register  />   {/*   signUp component   */}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account;