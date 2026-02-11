
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { getRole, getToken, isLoggedIn, logout } from "./components/Auth.js";
import { BrowserRouter, Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Visitors from "./pages/Visitors.jsx";
import Resident from "./pages/Resident.jsx";
import ListOfVisitors from "./components/ListOfVisitors.jsx";
import ListOfResident from "./components/ListOfResident.jsx";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Account from "./pages/Account.jsx";

const App = () => {

  const token = getToken();
  const { role, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true)
  const [countOfResident, setCountOfResident] = useState()
  const setResidentCount = (count) => {
    setCountOfResident(count)
  }

  return (
    <>
      <div className="container-fluid   ">
        <BrowserRouter>
          <div className="row relative">
            {/* Sidebar */}
            <div className={`h-full ancent-gray  position-sticky shadow px-0 d-flex flex-column ${isOpen ? "col-2" : "col-1"}`} >
              <div className={`sidebar bg-warning  ${isOpen ? "d-flex justify-content-between align-item-center" : "text-center "} `}>
                <button onClick={() => { setIsOpen(!isOpen) }} className="btn text-white" ><i className="bi bi-justify fs-2 "></i></button>
                {isOpen ? <img src="/public/logo.png" className="logo my-auto me-2" alt="" /> : ""}
              </div>
              {!role && (
                <>
                  <NavLink to="/" className="nav-link text-decoration-none">{isOpen ? <div className="text-light fs-4 mx-3 mt-2">Login</div> : <div className=" text-center"><i className="bi bi-house fs-2 text-light"></i> </div>}</NavLink>
                </>
              )}
              {role === "ROLE_GUARD" && (
                <div className="d-flex flex-column height justify-content-between">
                  <div>
                    <NavLink to="/gard_dashboard" className="nav-link text-decoration-none " >{isOpen ? <span className="text-light fs-4 mx-3 mt-2"><i className="bi bi-speedometer2 fs-4 text-light"></i> Home</span> : <div className="text-center"><i className="bi bi-speedometer2 fs-3 text-light"></i> </div>}</NavLink>
                    <NavLink to="/visitors_entry" className="nav-link text-decoration-none " >{isOpen ? <span className="text-light fs-4 mx-3 mt-2"><i className="bi bi-person-plus-fill text-light fs-4"></i> Visitors</span> : <div className="text-center"><i class="bi bi-person-plus-fill text-light fs-3"></i> </div>}</NavLink>
                    <NavLink to="/allActiveVisitors" className="nav-link text-decoration-none" >{isOpen ? <span className="text-light fs-4 mx-3 mt-2"><i className="bi bi-people-fill fs-5 text-light" ></i> All visitors</span> : <div className="text-center"><i className="bi bi-people-fill fs-3 text-light" ></i> </div>}</NavLink>
                  </div>
                  <div className="px-3 bg-warning">
                    {isOpen ?
                      <div className="profile text-center fs-5 d-flex justify-content-between ">
                        <button className=" btn text-danger" onClick={logout}  >Logout</button>
                      </div>
                      :
                      <div className="profile text-center fs-5 d-flex flex-wrap mx-auto ">               
                        <span> <button className=" btn text-danger" onClick={logout}  >Logout</button></span>
                      </div>
                    }
                  </div>
                </div>
              )}
              {role === "ROLE_SECRETARY" && (
                <div className="d-flex flex-column height justify-content-between">
                  <div >
                    <NavLink to="/resident" className="nav-link text-decoration-none" >{isOpen ? <span className="text-light fs-4 mx-3 mt-2 "><i className="bi bi-person-badge text-white fs-4"></i> Resident</span> : <div className="text-center"><i className="bi bi-person-badge text-white fs-2"></i> </div>}</NavLink>
                    <NavLink to="/allActiveVisitors" className="nav-link text-decoration-none" >{isOpen ? <span className="text-light fs-4 mx-3 mt-2"><i className="bi bi-person-walking w-25 fs-4 text-light" ></i> Active Visitors</span> : <div className="text-center"><i className="bi bi-person-walking w-25 fs-2 text-light" ></i></div>}</NavLink>
                    <NavLink to="/allResident" className="nav-link text-decoration-none" >{isOpen ? <span className="text-light fs-4 mx-3 mt-2"><i className="bi bi-people-fill fs-4 text-white"></i> All Resident</span> : <div className="text-center"><i className="bi bi-people-fill fs-2 text-white"></i></div>}</NavLink>
                  </div>
                  <div className="px-3 bg-warning">
                    {isOpen ?
                      <div className="profile text-center fs-5 d-flex justify-content-between ">
                        <button className=" btn text-danger" onClick={logout}  >Logout</button>
                      </div>
                      :
                      <div className="profile text-center fs-5 d-flex flex-wrap mx-auto ">
                        <span> <button className=" btn text-danger" onClick={logout}  >Logout</button></span>
                      </div>
                    }
                  </div>

                </div>

              )}

            </div>
            {/* Right container */}
            <div className={isOpen ? "col-10 gap-0" : "col-11  "}>
              {/*Website Heading */}
              <div className="row ancent-gray position-sticky top-0">
                <div className="col-10 fs-1 bold text-center  text-light">
                  <img src="/public/logo.png" className="logo " alt="" />
                  <span className="drop-shadow">Gate<span className="text-warning">Log</span>ix</span>
                </div>
              </div>
              <div className="row ">
                <Routes>
                  {/* Public Route */}
                  <Route path="/" element={<Account />} />
                  {/* Secretary Routes */}
                  <Route
                    path="/resident"
                    element={<ProtectedRoute allowedRoles={['ROLE_SECRETARY']} userRole={role}> <Resident /> </ProtectedRoute>}
                  />
                  <Route
                    path="/allResident"
                    element={<ProtectedRoute allowedRoles={['ROLE_SECRETARY']} userRole={role}> <ListOfResident /> </ProtectedRoute>}
                  />

                  {/* Guard Routes */}
                  <Route
                    path="/gard_dashboard"
                    element={<ProtectedRoute allowedRoles={['ROLE_GUARD']} userRole={role}> <Home /> </ProtectedRoute>}
                  />
                  <Route
                    path="/visitors_entry"
                    element={<ProtectedRoute allowedRoles={['ROLE_GUARD']} userRole={role}> <Visitors /> </ProtectedRoute>}
                  />

                  {/* Common Routes */}
                  <Route
                    path="/allActiveVisitors"
                    element={<ProtectedRoute allowedRoles={["ROLE_GUARD", "ROLE_SECRETARY"]}> <ListOfVisitors /> </ProtectedRoute>}
                  />
                </Routes>

              </div>
            </div>
          </div>
        </BrowserRouter >
      </div>
    </>
  )
}

export default App
