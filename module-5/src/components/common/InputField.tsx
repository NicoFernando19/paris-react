import React from 'react';
//scoped styling
import styles from '@/styles/InputField.module.css';

interface InputProps {
    id: string;
    name: string;
    type: string;
    value: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
}

const InputField: React.FC<InputProps> = ({ id, name, type, value, onChange, label, placeholder, className, disabled = false }) => {
    return (
        <React.Fragment> 
            {
                label && (
                    <label className='text-black' htmlFor={id}>{label}</label>
                )
            }
            
            <input 
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`${styles.formInput} ${className}`}
                placeholder={placeholder}
                disabled={disabled}
            />
        </React.Fragment>
    )
}

export default InputField;
