import classes from './RetroButton.module.css'

type RetroButtonProps = {
    children: string,
    onClick: () => void,
    className?: string,
}

const RetroButton = ({children, onClick, className}: RetroButtonProps) => {
    return (
        <button onClick={onClick} className={`${classes.RetroButton} ${className}`}>{children}</button>
    );
};

export default RetroButton;