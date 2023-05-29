import "./button.styles.scss";


//a variable for having the possibility to have different stylings for just one button
const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted"
}


const Button = ({children, buttonType, ...otherProps}) => {
    return (
        //we render the children inside of this button component
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}{...otherProps}>{children}</button>
    );
};

export default Button;


/*
We have 3 kinds of button on our page

default

inverted

google sign in
*/