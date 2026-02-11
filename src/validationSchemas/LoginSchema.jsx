import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().min(5).required("Please enter username"),
  password: Yup.string().required("Password is required").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be at least 8 characters, include uppercase, lowercase, number and special character")

});

