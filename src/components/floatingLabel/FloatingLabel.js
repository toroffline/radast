import { useId, useState } from 'react';
import './FloatingLabel.css';

function InputFloatingLabel(props) {
    const {
        label,
        id,
        type,
        value,
        placeholder: _placeholder,
        onChange,
        color,
        disabled,
    } = props;
    const [placeholder, setPlaceholder] = useState(' ');
    const randomId = useId();

    return (
        <div className="relative">
            <input
                type={type ?? 'text'}
                value={value}
                id={id ? `floating-label-${id}` : `floating-label-${randomId}`}
                className={`floating-label peer ${color || ''}`}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setPlaceholder(_placeholder)}
                onBlur={() => setPlaceholder(' ')}
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
