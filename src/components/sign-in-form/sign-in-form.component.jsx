import {useState} from "react";
import {signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

//object with the initialized values for the form fields
//this object is the value for formFields
const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    //here we destructure of the values. the reason is that we are going to use these
    //values somewhere in the code
    const {email, password} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    //Figure out what happens whenever these values change so that I can update my form fields

    const handleSubmit = async (event) => {
        //we don't want default values
        event.preventDefault();

        //step two: create user
        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case "auth/wrong-password":
                    alert("Incorrect password for email!");
                    break;
                case "auth/user-noy-found":
                    alert("No user associated with this email");
                    break;
                default:
                    console.log(error);
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
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            {/* submithandler runs a callback whenever you submit a form. it only runs when all validations are passing*/}
            {/* name = same name as object in defaultFormFields */}
            <form onSubmit={handleSubmit}>
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

                <div className="buttons-container">
                    {/* when the button is klicked run the onSubmit callback */}
                    <Button type="submit">Sign In</Button>
                    {/* a button within a form is by default of type submit. because we don't want type submit for the google button
                    we have to make it of type button */}
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;