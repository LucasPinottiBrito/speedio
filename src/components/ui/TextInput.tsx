import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
    return (
        <div className="flex flex-col space-y-2">
            {label && <label className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</label>}
            <input
                {...props}
                className="px-4 py-2 placeholder:text-gray-500 border rounded-md bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50"
            />
        </div>
    );
};

export default TextInput;