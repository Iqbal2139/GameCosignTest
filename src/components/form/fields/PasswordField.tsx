import React, { useState } from 'react';

interface PasswordFieldProps {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = React.memo(
    ({ name, label, value, onChange, error }) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const togglePasswordVisibility = () => {
            setIsPasswordVisible(!isPasswordVisible);
        };

        return (
            <div className="relative mb-4">
                <input
                    id={name}
                    type={isPasswordVisible ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="border rounded w-full py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    {isPasswordVisible ? "Hide" : "Show"}
                </button>
                {error && <span className="text-red-500 text-sm">{error}</span>}
            </div>
        );
    },
    (prevProps, nextProps) => prevProps.value === nextProps.value
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
