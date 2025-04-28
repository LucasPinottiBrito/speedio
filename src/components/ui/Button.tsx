import React from 'react';
import { IconBaseProps } from 'react-icons';

interface ButtonProps {
    label?: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, className, icon: Icon }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${className} px-4 py-2 cursor-pointer bg-gray-100 text-gray-900 font-bold  rounded-lg hover:opacity-80 focus:ring-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center`}
        >
            {Icon && <Icon size={20} className={`${label?('mr-2'):('ml-0.5')}`}/>} {/* Render the icon if provided */}
            {label}
        </button>
    );
};

export default Button;