import Label from './Label';

const DropDown = ({ label, options, onChange, disabled }) => {
    return (
        <Label htmlFor="dropdown" labelText={label}>
            <select name="dropdown" className="dropdown" defaultValue="" onChange={onChange}>
                <option value="" disabled>{disabled}</option>
                {options.map(option => (
                    <option value={option.id} key={option.id}>
                        {option.nome}
                    </option>
                ))}
            </select>
        </Label>
    );
}

export default DropDown;