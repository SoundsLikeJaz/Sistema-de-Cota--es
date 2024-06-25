const Label = (props) => {
    return (
        <div className="labelCard wrapper">
            <label htmlFor={props.htmlFor} className="label">
                {props.labelText}
            </label>
            {props.children}
        </div>
    );
}

export default Label;