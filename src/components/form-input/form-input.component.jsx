//functional component
// const FormInput = ({label, changeHandler, value}) => {
//     return (
//         <label>Display Name</label>
//         <input
//             type="text" 
//             required 
//             onChange={changeHandler} 
//             name="displayName" 
//             value={displayName}/>
//     )
// }

//Instead this way
import "./form-input.styles.scss"

const FormInput = ({label, ...otherProps}) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps}/>
            {/* if there is no label, don't render a label */}
            {label && (
                // we render string in javascript
                // if the user has typed something in this input append the shrink class to it, otherwise do anything
                <label className={`${otherProps.value.length > 0 ? "shrink" : null} form-input-label`}>{label}</label>
            )}
        </div>
    );
};

export default FormInput;