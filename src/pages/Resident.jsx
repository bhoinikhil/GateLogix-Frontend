import React from 'react'
import AddResident from '../components/AddResident'
import AddVehicleToResident from '../components/AddVehicleToResident'

const Resident = () => {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-4 ps-4">
            <AddResident/>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-4">
            <AddVehicleToResident/>
        </div>
      </div>
      <div className="row">
        <div className="col-12 px-3 rounded ">
          <img src="./vehical banner.jpg" className='w-100 mt-2 rounded shadow mb-3' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Resident;
