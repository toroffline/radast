import { useId } from 'react';
import './FloatingLabel.css';

function InputFloatingLabel(props) {
    const { label, id, type, value, onChange, color, disabled } = props;
    const randomId = useId();

    return (
        <div className="relative">
            <input
                type={type ?? 'text'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                id={id ? `floating-label-${id}` : `floating-label-${randomId}`}
                className={`floating-label peer ${color || ''}`}
                placeholder=" "
                disabled={disabled}
            />

            <label
                htmlFor={
                    id ? `floating-label-${id}` : `floating-label-${randomId}`
                }
                className={`floating-label ${color || ''}`}
            >
                {label}
            </label>
        </div>
    );
}

export default InputFloatingLabel;
