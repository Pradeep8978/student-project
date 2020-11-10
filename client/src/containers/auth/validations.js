const validateName = (name) => {
    let errorMessage;
    if (!name) {
        errorMessage = "Please Enter Name"
    }
    return errorMessage
}
const validatePhoneNumber = (num) => {
    let errorMessage;
    const numRegex = /^\d{10}$/
    if (!num) {
        errorMessage = "Please enter Phone Number"
    }
    else if (!numRegex.test(num)) {
        errorMessage = "Enter Only 10 Digit Number"
    }
    return errorMessage;
}
const validateEmail = (value) => {
    let errorMessage;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value) {
        errorMessage = "Please enter email"
    }
    else if (!emailRegex.test(value)) {
        errorMessage = "Plese Provide correct Email"
    }
    return errorMessage;
}
const validatePassword = (psd) => {
    let errorMessage;
    // debugger
    // const psdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
    if (!psd) {
        errorMessage = "Please Enter Password"
    }
    // else if (!psdRegex.test(psd)) {
    //     errorMessage = "Charcters Must be A-Z && a-z && special cases"
    // }
    return errorMessage;

}
export const validateConfig = {
    name: validateName,
    phone: validatePhoneNumber,
    email: validateEmail,
    password:validatePassword
}