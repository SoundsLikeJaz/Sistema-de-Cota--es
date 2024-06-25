const button = ({texto = "Enviar", onClick}) => {
    return (
        <button className="button" onClick={onClick}>{texto}</button>
    );
}

export default button;