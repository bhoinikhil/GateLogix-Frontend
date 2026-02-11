import * as Yup from "yup";

export const VisitorEntrySchema = Yup.object({
    visitorName: Yup.string().required("Please enter name"),
    vehicleRegisterationNumber: Yup.string()
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/, "Invalid formate Expected format like MH19AB1234")
    .required("Please enter registration Number"),
    vehicleName: Yup.string().required("Please enter name of vehical"),
    visitPurpose: Yup.string().required("Please enter Purpose of Visit"),
    visitorType: Yup.string().required("Please enter type of visitor")
    
})