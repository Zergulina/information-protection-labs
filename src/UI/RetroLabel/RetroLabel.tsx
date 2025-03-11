import classes from './RetroLabel.module.css'

type RetroLabelProps = {
    children: string,
    labelZIndex: number,
    className?: string,
}

const RetroLabel = ({children, labelZIndex, className}: RetroLabelProps) => {
    return (
        <label className={`${classes.RetroLabel} ${className}`} style={{zIndex: labelZIndex}}>{children}</label>
    );
};

export default RetroLabel;