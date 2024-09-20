import { FiXCircle } from "react-icons/fi";

export default function Popup({ children, title, onClose }) {
    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="popup-closer">
                    <button onClick={onClose}><FiXCircle /></button>
                </div>
                <div className="popup-header">
                    <h2>{title}</h2>

                </div>
                <div className="popup-content">
                    {children}
                </div>
            </div>
        </div>
    );
}