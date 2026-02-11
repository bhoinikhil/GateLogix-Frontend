import { useState } from "react"
import VisitorEntry from "../components/VisitorEntry"
import Axios from "axios";
import { getErrorMessage } from "../exceptionHandler/ErrorMessage";
import AllActiveVisitors from "../components/AllActiveVisitors";
import api from "../components/Api";
const Home = () => {
  const [isVisitor, setIsVisitor] = useState(true)
  const [regNo, setRegNo] = useState("");
  const [visitor, setVisitor] = useState({});
  const [resident,setResident]= useState({});
  const [countAllVisitor, setCountAllVisitor] = useState(""); 
   
  const visitorCount = (count) => {
    setCountAllVisitor(count)
  }
  // This function for search visitor by regNo.
  const fetchVisitor = async () => {
    await api.get("http://localhost:8080/getVisitorByRegNo", {
      params: {
        registrationNumber: regNo
      }
    })
      .then(response =>
       { 
        setVisitor(response.data) 
       })
      .catch(error => {
        const message = getErrorMessage(error)
        alert(message)
      })

  }
  // This function for search resident by regNo.
  const fetchResident= async()=>{
    const response =await Axios.get("http://localhost:8080/getResidentByRegNo",{
      params:{
         registrationNumber: regNo
        }
    }).then(response =>{ 
      setResident(response.data)
    })
      .catch(error=>{alert(getErrorMessage(error))})

  }
  // function for validating user input Registration Number.
  const handleSubmit = (e) => {
    e.preventDefault();// prevent page refresh.
    const regex = /^MH\d{2}[A-Z]{2}\d{4}$/;
    if (!regex.test(regNo.trim().toUpperCase())) {
      alert("Invalid format. Example: MH17YU8956")
    }
    isVisitor?fetchVisitor():fetchResident();
  }
  return (
    <>
    
      
      <div className="row mt-3">
        <div className="col-sm-3 ">
          <VisitorEntry />
        </div>
        {/* search section */}
        <div className="col-sm-6 ">
          <div className="row">
            <div className="findVisitorSec rounded shadow p-2">
              <div className="row ">
                <div className="col-6 text-end">
                <button onClick={() => { setIsVisitor(true) }} className={`btn ${isVisitor?"bold":""}`} >Find Visitor </button>
                </div>
                <div className="col-6 text-start">
                <button onClick={() => { setIsVisitor(false) }} className={`btn ${!isVisitor?"bold":""}`}>Find Resident </button>
                </div>
              </div>
              <div className="row">
                {isVisitor ?
                // for visitor search form
                  <div className="visitorForm">
                    <form action="" onSubmit={handleSubmit}>
                      <div className="col-10 mx-auto ">
                        <input type="text" placeholder="Enter Registration Number...e.g.MH19PD1254" onChange={(e) => { setRegNo(e.target.value) }} value={regNo} className="form-control mt-2" />
                      </div>
                      <div className="col-6 mx-auto "><button type="submit" className="btn btn-primary form-control mt-2">Search</button></div>
                    </form>
                  </div> : 
                  // for resident search form 
                  <div className="residentForm">
                    <form onSubmit={handleSubmit} action="">
                      <div className="col-10 mx-auto ">
                        <input type="text" placeholder="Enter Registration Number...e.g.MH19PD1254" onChange={(e) => { setRegNo(e.target.value) }} value={regNo} className="form-control mt-2" />
                      </div>
                      <div className="col-6 mx-auto "><button type="submit" className="btn btn-primary form-control mt-2" >Search</button></div>
                    </form>
                  </div>
                }
              </div>
            </div>
            {
              // for visitor response
              Object.keys(visitor).length !== 0 ? <div className="visitorDetails shadow rounded mt-3 p-2 position-relative">
                <span className="position-right-top"><button onClick={() => { setVisitor({}), setRegNo("") }} className="btn"><i className="bi bi-x-circle text-danger drop-shadow"></i></button></span>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Visitor Name :</th>
                      <td>{visitor.visitorName} </td>
                    </tr>
                    <tr>
                      <th>Visitor Mobile Number :</th>
                      <td>{visitor.visitorMobileNo}</td>
                    </tr>
                    <tr>
                      <th>Purpose of visit : </th>
                      <td>{visitor.visitPurpose} </td>
                    </tr>
                    <tr>
                      <th>Vehical Name :</th>
                      <td>{visitor.vehicalName} </td>
                    </tr>
                    <tr>
                      <th>CheckIN Time </th>
                      <td>{visitor.timeIn} </td>
                    </tr>
                    <tr>
                      <th>Checked Out Time</th>
                      <td>{visitor.timeOut != null ? visitor.timeOut : "Active"} </td>
                    </tr>
                    <tr>
                      <th>Resident Name :</th>
                      <td>{visitor.residentFirstName} {visitor.residentLastName} </td>
                    </tr>
                    <tr>
                      <th>Resident Flat Number : </th>
                      <td>{visitor.residentFlatNo} </td>
                    </tr>
                    <tr>
                      <th>Resident Mobile Number :</th>
                      <td>{visitor.residentMobileNo} </td>
                    </tr>
                  </tbody>
                </table>
              </div> : null
            }
            { 
            // for resident response.
              Object.keys(resident).length!=0 ? <div className="visitorDetails shadow rounded mt-3 p-2 position-relative">
                <span className="position-right-top"><button onClick={() => { setResident({}), setRegNo("") }} className="btn"><i className="bi bi-x-circle text-danger drop-shadow"></i></button></span>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Resident Name :</th>
                      <td>{resident.firstName} {resident.lastName}</td>
                    </tr>
                    <tr>
                      <th> Mobile Number :</th>
                      <td>{resident.MobileNo}</td>
                    </tr>
                    <tr>
                      <th>Email : </th>
                      <td>{resident.email} </td>
                    </tr>
                    <tr>
                      <th>Flat Number</th>
                      <td>{resident.flatNo}</td>
                    </tr>
                  </tbody>
                </table>
              </div> : ""
            }
          </div>
          {/* Hero section  */}
          <div className="row mt-3 ">
            <div className="col rounded shadow p-0">
            <img src="./public/PixVerse_Image_Effect_prompt_Create a high-qua (1).jpg" alt="" className=" rounded w-100 " />
            </div>
          </div>
          {/* conunting sec start */}
      <div className="row mx-2 py-3">
        <div className="col-6 px-0 ">
          <div className="ActiveVisitorCount rounded shadow mx-2 h-100 border ">
            <div className="row p-2">
              <div className="col-3 text-center"><i className="bi bi-car-front-fill text-primary font-1"></i></div>
              <div className="col-9"><h6 > Active Visitors</h6><h5>{countAllVisitor}</h5> </div>
            </div> 
          </div>
        </div>
        <div className="col-6 px-0 ">
          <div className="visitorsCheckedOut rounded shadow mx-2 h-100 border ">
            <div className="row p-2">
              <div className="col-3 text-center"><i className="bi bi-check-square-fill text-success font-1"></i></div>
              <div className="col-9"><h6>Visitors Checked-Out</h6><h5>03</h5></div>
            </div>
          </div>
        </div>
      </div>
        </div>
        {/* All Active visitors details  */}
        <div className="col-sm-3 col-12">
          <AllActiveVisitors visitorCount={visitorCount} />
        </div>
      </div>
    </>
  )
}

export default Home;
//Installation Tailwind.css.
// Step1: install command : npm install tailwindcss @tailwindcss/vite.
//Step2: inside vite.config.js file ->Add tailwindcss() inside the plugins.
//Step3: inside css file Add statement -> @import "tailwindcss";
// then use.