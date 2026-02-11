import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from './Api';
import { getErrorMessage } from '../exceptionHandler/ErrorMessage';

const ListOfVisitors = () => {
      const [activeVisitor, setActiveVisitor] = useState([])
    const fetchData = async () => {
        await api.get("/getAllActiveVisitors?listOfVisitorType=GUEST&listOfVisitorType=DELIVERY")
        .then(res=>{setActiveVisitor(res.data),console.log(res.data)}
        )
        .catch(error=>alert(getErrorMessage(error)))
    }
    useEffect(() => {
        fetchData();
    }, [])
    // ConvertTime
    const convertTime = (dateTime) => {
        const time = new Date(dateTime).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });
        const date = new Date(dateTime).toLocaleDateString("en-CA")
        return time;
    }
    // convert Date
    const convertDate = (dateTime) => {
        const date = new Date(dateTime).toLocaleDateString("en-CA")
        return date;
    }
    // update visitor checked out.
    const checkedOut = (regNo) => {
        axios.put("http://localhost:8080/updateVisitorOutTime", {
        }, {
            params: {
                registrationNumber: regNo
            },
        })
        alert("Visitor Checked Out Successfully")
        fetchData();
    }
  return (
    <div className="col-12 mt-2">
                    <h3 className='primary-heading'>All Active Visitors</h3>
                    <table className='table border mt-3 p-2 '>
                        <thead  >
                            <tr >
                                <th className='action-blue'>Visitor Name</th>
                                <th className='action-blue'>Entry Date</th>
                                <th className='action-blue'>Check-In Time</th>
                                <th className='action-blue'>Mobile Number</th>
                                <th className='action-blue'>Vehicle</th>
                                <th className='action-blue'>Vehicle Number</th>
                                <th className='action-blue'>Purpose of visit</th>
                                <th className='action-blue'>Type of visitor</th>
                                <th className='action-blue'>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                activeVisitor.map((ele, index) => {
                                    return (
                                        <tr key={index} >
                                            <td >{ele.visitorName} </td>
                                            <td> {convertDate(ele.timeIn)} </td>
                                            <td >{convertTime(ele.timeIn)} </td>
                                            <td >{ele.phoneNumber} </td>
                                            <td >{ele.vehicleName} </td>
                                            <td >{ele.vehicleRegisterationNumber} </td>
                                            <td >{ele.visitPurpose} </td>
                                            <td >{ele.visitorType} </td>
                                            <td > <button onClick={() => { checkedOut(ele.vehicleRegisterationNumber) }} className='btn btn-danger'>Check-Out</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
  )
}

export default ListOfVisitors
