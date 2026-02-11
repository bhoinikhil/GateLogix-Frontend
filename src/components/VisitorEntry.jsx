import { useState } from 'react'
import { getErrorMessage } from '../exceptionHandler/ErrorMessage'
import api from './Api';
import { useFormik } from 'formik';
import { VisitorEntrySchema } from '../validationSchemas/VisitorEntrySchema';

const initialValue = {
  visitorName: "",
  vehicleRegisterationNumber: "",
  vehicleName: "",
  phoneNumber: "",
  visitPurpose: "",
  visitorType: "",
}

const VisitorEntry = () => {
  const [residentEmail, setResidentEmail] = useState("")
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValue,
    validationSchema: VisitorEntrySchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      
      api.post("/addVisitor", values, {
        params: {
          email: residentEmail
        },
      }).then(alert("Checked In Successfully"),setResidentEmail(""))
        .catch(error => {
          alert(getErrorMessage(error))
        })
    }
  })

  return (
    <>
      <div className="addVisitor shadow p-3">
        <h4 className='text-center' >New Visitor Entry</h4>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="visitorName" className="mt-2 bold">Visitor Name </label>
          <input type="text"
            name="visitorName"
            value={values.visitorName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control" />
          {touched.visitorName && errors.visitorName ? <p className='text-danger'>{errors.visitorName}</p> : null}
          <label htmlFor="vehicleNumber" className="mt-2 bold">Vehicle Number </label>
          <input type="text"
            name='vehicleRegisterationNumber'
            value={values.vehicleRegisterationNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control" />
          {touched.vehicleRegisterationNumber && errors.vehicleRegisterationNumber ? <p className='text-danger'>{errors.vehicleRegisterationNumber}</p> : null}
          <label htmlFor="vehicleName" className="mt-2 bold">Vehicle Name </label>
          <input type="text"
            name='vehicleName'
            value={values.vehicleName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control" />
          {touched.vehicleName && errors.vehicleName ? <p className='text-danger'>{errors.vehicleName}</p> : null}
          <label htmlFor="phone" className="mt-2 bold">Phone Number </label>
          <input type="number"
            name='phoneNumber'
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            placeholder='Enter Mobile Number..' />
          {touched.phoneNumber && errors.phoneNumber ? <p className='text-danger'>{errors.phoneNumber}</p> : null}
          <label htmlFor="residentEmail" className='mt-2 bold' >Resident Email</label>
          <input type="email"
            className='form-control'
            onChange={(e) => { setResidentEmail(e.target.value) }} />

          <label htmlFor="visitPurpose" className="mt-2 bold">Visit Purpose </label>
          <input type="text" id="visitPurpose"
            name='visitPurpose'
            value={values.visitPurpose}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control" />
          {touched.visitPurpose && errors.visitPurpose ? <p className='text-danger'>{errors.visitPurpose}</p> : null}
          <label htmlFor="visitorType" className="mt-2 bold">Type of visitor</label><br />
          <select
            name="visitorType"
            value={values.visitorType}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control">
            <option value="" >Select type of visitor</option>
            <option value="GUEST" >Guest</option>
            <option value="DELIVERY" >Delivery</option>
          </select>
          {touched.visitorType && errors.visitorType ? <p className='text-danger'>{errors.visitorType}</p> : null}
          <button type="submit" className="btn btn-primary mt-2 bold form-control" >Check-In</button>
        </form>
      </div>
    </>
  )
}

export default VisitorEntry
