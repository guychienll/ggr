import * as React from 'react';
import { clsx } from 'clsx';
import { MouseEventHandler } from 'react';

const Button: React.FC<{
    children?: React.ReactNode;
    onClick?: MouseEventHandler;
    disabled?: boolean;
}> = (props) => {
    return (
        <button
            data-testid="button"
            onClick={props.onClick}
            disabled={props.disabled}
            className={clsx([
                'bg-gray-500',
                'border-gray-100',
                'border-4',
                'py-2',
                'px-4',
                'rounded-lg',
                'text-gray-800',
                'disabled:opacity-50',
                'disabled:cursor-not-allowed',
            ])}
        >
            {props.children}
        </button>
    );
};

export default Button;
