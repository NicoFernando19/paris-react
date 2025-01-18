import styles from './Button.module.css';

interface ButtonProps {
    onClick: () => void
    label: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className }) => {
    return (
        <button className={`${styles.btn} ${className}`} type='button' onClick={onClick}>
            {label}
        </button>
    )
}

export default Button;