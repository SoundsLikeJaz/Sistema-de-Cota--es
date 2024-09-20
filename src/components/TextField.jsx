import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Label from "./Label";

const TextField = ({ label = "Label", inputType = "text", placeholder, id, value, onChange }) => {
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    function handleInput() {
        if (inputType === "textarea") {
            return (
                <textarea 
                placeholder={placeholder}
                className="input textarea"
                id={id}
                maxLength={50}
                value={value}
                onChange={onChange}
                />
            );
        } else if (inputType === "password") {
            return (
                <div style={{ display: "grid" }}>
                    <input
                        placeholder={placeholder}
                        className="input"
                        type={senhaVisivel ? 'text' : 'password'}
                        value={inputValue}
                        onChange={handleInputChange}
                        id={id}
                    />
                    <div
                        style={{
                            fontSize: "2em",
                            position: "relative",
                            justifySelf: "flex-end",
                            top: "-1.25em",
                            cursor: "pointer",
                            paddingRight: "0.2em"
                        }}
                    >
                        {senhaVisivel ? <FaEyeSlash onClick={toggleSenhaVisivel} /> : <FaEye onClick={toggleSenhaVisivel} />}
                    </div>
                </div>
            );
        } else {
            return (
                <input
                    className="input"
                    placeholder={placeholder}
                    type={inputType}
                    id={id}
                    value={value}
                    onChange={onChange}
                />
            );
        }
    }

    return (
        <Label htmlFor="input" labelText={label} >
            {handleInput()}
        </Label>
    );
};

export default TextField;