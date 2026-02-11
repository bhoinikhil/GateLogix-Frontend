import Axios from 'axios';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '../exceptionHandler/ErrorMessage';
import api from './Api';
const AllActiveVisitors = ({visitorCount}) => {
    const [activeVisitor, setActiveVisitor] = useState([])

//  fetch visitor 
     const fetchData = async () => {
            await api.get("/getAllActiveVisitors?listOfVisitorType=GUEST&listOfVisitorType=DELIVERY")
            .then(res=>{
                setActiveVisitor(res.data)
                visitorCount(res.data.length) 
            })
            .catch(error=>alert(getErrorMessage(error)))
        }
// update visitor checked out.
    const checkedOut=(regNo)=>{
        api.put("http://localhost:8080/updateVisitorOutTime",{
        },{
            params:{
                registrationNumber : regNo
            },
        }).then(alert("Visitor Checked Out Successfully"),fetchData())
        .catch(error =>alert(getErrorMessage()))
    }
    useEffect(() => {
        fetchData()
    }, [])

    const convertTime = (dateTime) => {
        const time = new Date(dateTime).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });
        const date = new Date(dateTime).toLocaleDateString("en-CA")
        return time;
    }
    const convertDate=(dateTime)=>{
        const date = new Date(dateTime).toLocaleDateString("en-CA")
        return date;
    }
    return (
        <>
            <div className="allActiveVisitors p-2 rounded shadow ">
                <h4 className='primary-heading' >Active Visitors</h4>
                {
                    activeVisitor.map((visitor, index) => {
                        return (
                            <div key={index} className="visitor mt-3 p-1 shadow d-flex justify-content-around rounded ">                      
                                    <div className="col-7">
                                        <span className= {visitor.visitorType=='GUEST'?'rounded font-checkout guest-blue px-2 me-2 bold text-light':'rounded bg-warning px-2 me-2 bold text-light'}>{visitor.visitorType}</span>
                                        <span className='bold '>{visitor.visitorName}</span>
                                        <div >Check In : <span className='bold' >{convertTime(visitor.timeIn)}</span> </div>
                                        <div > Date : <span className='bold' >{convertDate(visitor.timeIn)}</span> </div>
                                    </div>
                                    <div className="col-5"><button className='btn font-checkout pure-red text-light bold' onClick={()=>{checkedOut(visitor.vehicleRegisterationNumber)}}>Check-Out</button></div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AllActiveVisitors
