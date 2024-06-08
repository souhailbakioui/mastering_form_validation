

import { useRef, useState } from 'react';


export default function FormValidationBeginners() {

    const emailField = useRef();
    const passwordField = useRef();
    const confirmPasswordField = useRef();
    const firstNameField = useRef();
    const lastNameField = useRef();
    const phoneNumber = useRef();

    const isValidEmail = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;


    const [erreurs, setErreurs] = useState([])

    const validateFields = () => {
        setErreurs([])
        let emailValue = emailField?.current.value
        let passwordValue = passwordField?.current.value
        let confirmPasswordFieldValue = confirmPasswordField?.current.value
        let firstNameFieldValue = firstNameField?.current.value
        let lastNameFieldFieldValue = lastNameField?.current.value
        let phoneNumberFieldValue = phoneNumber?.current.value

        let is_validate = true

        if (validateName(firstNameFieldValue)) {
            is_validate = false

            addMessageError(setErreurs, "Name", "Last name is required")
        }
        console.log(lastNameFieldFieldValue)
        if (validateName(lastNameFieldFieldValue)) {
            is_validate = false
            addMessageError(setErreurs, "Last name", "Last name is required")
        }


        if (passwordConfirmationCheck(passwordValue, confirmPasswordFieldValue) || validateName(passwordValue)) {
            is_validate = false
            addMessageError(setErreurs, "Password", "Passwords not matche")
        }

        if (!emailValidation(emailValue) || validateName(emailValue)) {
            is_validate = false
            addMessageError(setErreurs, "Email", "Email is not valid")
        }

        if (validatePhoneNumber(phoneNumberFieldValue) || validateName(phoneNumberFieldValue)) {
            is_validate = false
            addMessageError(setErreurs, "Number", "Number Phone is not valid")
        }
        console.log(erreurs)
        return is_validate
    }

    const validateName = (name) => {
        return name.trim() == ""
    }

    const emailValidation = (email) => {
        return email.match(isValidEmail)
    }
    const passwordConfirmationCheck = (password, confirmationPassword) => {
        return password != confirmationPassword
    }
    const validatePhoneNumber = (phoneNumber) => {
        return phoneNumberRegex.test(phoneNumber);
    };
    const validationForm = (e) => {
        e.preventDefault()
        
        if(!validateFields()){
            e.preventDefault()
        }
    }
    const addMessageError = (errorsState, key, message) => {
        errorsState(prevState => {
            return [
                ...prevState,
                { [key]: message }
            ];
        })
    }

    return (
        <div className="h-screen items-center justify-center">

            {
                erreurs.length > 0 ?
                    <div className="p-4 mb-4 text-sm  rounded-lg   flex justify-center items-center" role="alert">
                        <ul className="p-4  dark:text-red-400 bg-red-50 dark:bg-gray-800 text-red-800">
                            {erreurs.map((erreur, index) => {
                                const [key, value] = Object.entries(erreur)[0];
                                return <li className="font-medium" key={index}>{key}: {value}</li>;
                            })}
                        </ul>
                    </div>
                    : ""
            }

            <form className="max-w-md mx-auto" onSubmit={validationForm}>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " ref={emailField} />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " ref={passwordField} />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " ref={confirmPasswordField} />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " ref={firstNameField} />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " ref={lastNameField} />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="tel" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " ref={phoneNumber} />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                    </div>

                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div >
    );
}
