
import { useEffect, useState } from "react";
import { getErrorMessage } from "../exceptionHandler/ErrorMessage";
import api from "./Api";

const ListOfResident = () => {
    const [resident, setResident] = useState([])
    const [searchData, setSearchData] = useState("");
    const fetchData = async () => {
        await api.get("/getAllResident")
            .then(response => {
                setResident(response.data)
            }).catch(error => {
                alert(getErrorMessage(error))
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const fliteredResident = resident.filter((res) => {
        console.log(res.lName)
        return (res.fName.toLowerCase().includes(searchData.toLowerCase())
        )
    })

    return (
        <div className="col-12 mt-3">
            <div className="row d-flex w-100">
                <div className="col-12 mx-auto text-end">
                    <input type="text" onChange={(e) => { setSearchData(e.target.value) }} className="rounded px-3  " placeholder="Search resident ..." />
                </div>
            </div>
            <h3 className="primary-heading" >All Residents in Society</h3>
            <div className="table-responsive">
                <table className="table table-bordered shadow">
                    <thead >
                        <tr >
                            <th className="action-blue text-white">Sr.No</th>
                            <th className="action-blue text-white">Name</th>
                            <th className="action-blue text-white">Flat No.</th>
                            <th className="action-blue text-white">Mobile No.</th>
                            <th className="action-blue text-white">Email</th>
                            <th className="action-blue text-white">Type</th>
                            <th className="action-blue text-white">Vehicals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fliteredResident.map((resident, index) => {

                                return (
                                    <tr key={index + 1} >
                                        <td>{index + 1} </td>
                                        <td>{resident.fName} {resident.lName} </td>
                                        <td>{resident.flatNo}</td>
                                        <td>{resident.mobileNo}</td>
                                        <td>{resident.email} </td>
                                        <td>{resident.residentType}</td>
                                        <td className="table-responsive" >{
                                            resident.vehicalList != 0 ? <table className="table shadow table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Type</th>
                                                        <th>Model</th>
                                                        <th>Registeration No.</th>
                                                        <th>color</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    resident?.vehicalList?.map((vehicle, index) => {
                                                        return (
                                                            <tbody key={index} >
                                                                <tr  >
                                                                    <td>{vehicle.type} </td>
                                                                    <td>{vehicle.vName}</td>
                                                                    <td>{vehicle.registerationNumber}</td>
                                                                    <td>{vehicle.color} </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    })
                                                }
                                            </table> : <div className="bold">-</div>
                                        }

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ListOfResident;