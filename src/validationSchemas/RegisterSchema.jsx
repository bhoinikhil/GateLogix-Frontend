import * as Yup from "yup";
export const RegisterSchema = Yup.object({
    name: Yup.string().min(2).required("Please enter name"),
    username: Yup.string().min(5).required("Please enter Username"),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must be at least 8 characters, include uppercase, lowercase, number and special character")
        .required("Please create new password"),
    mobileNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Please enter mobile number"),
    role: Yup.string().required("Please select Role of Employee")


});