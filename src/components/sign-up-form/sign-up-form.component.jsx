import {useState} from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

//object with the initialized values for the form fields
//this object is the value for formFields
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    //here we destructure of the values. the reason is that we are going to use these
    //values somewhere in the code
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //Figure out what happens whenever these values change so that I can update my form fields

    const handleSubmit = async (event) => {
        //we don't want default values
        event.preventDefault();

        //first step: check if password == confirmPassword
        if(password !== confirmPassword){
            //print it out for the user
            alert("passwords do not match");
            //then just exit
            return;
        }

        //step two: create user
        try{
            //here we get a user
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            // console.log(response); // response now is {user}

            //when we get back we pass user and the object with the displayName value to createUserDocumentFromAuth
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }catch(error){
            if(error.code == "auth/email-lready-in-use"){
                alert("Cannot create user, email already in use");
            }else{
                console.log("User creation encountered an error", error);
            }
        }
    };

    //general function which takes input event whenever the text changes
    const handleChange = (event) =>{
         //we tell useState which field to update
         //target gives us all fields attached with input
         const {name, value} = event.target;

         setFormFields({...formFields, [name]: value});
    };
       
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            {/* submithandler runs a callback whenever you submit a form. it only runs when all validations are passing*/}
            {/* name = same name as object in defaultFormFields */}
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />
                {/* when the button is klicked run the onSubmit callback */}
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;