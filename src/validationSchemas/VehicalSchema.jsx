import * as Yup from "yup";

export const VehicalSchema = Yup.object({
    vName: Yup.string().required("Please enter Vehical name."),
    registerationNumber: Yup.string()
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/, "Invalid formate Expected format like MH19AB1234.")
    .required("Please enter Registeration Number."),
    type: Yup.string().required("Please select vehical type."),
    color:Yup.string().required("Please enter vehical color.") 
})