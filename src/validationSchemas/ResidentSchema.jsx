import * as Yup from "yup";

export const ResidentSchema = Yup.object({
    fName: Yup.string().min(2).required("Please enter first name."),
    lName: Yup.string().required("Please enter last name"),
    flatNo: Yup.string().required("Please enter Flat Number"),
    mobileNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Please enter mobile number."),
    email: Yup.string().required("Please enter email."),
    residentType: Yup.string().required("Please select resident Type")
})