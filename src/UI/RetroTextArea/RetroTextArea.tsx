import classes from './RetroTextArea.module.css'

type RetroTextAreaProps = {
    value: string,
    className? : string
}

const RetroTextArea = ({value, className} : RetroTextAreaProps) => {
    return (
        <textarea value={value} contentEditable={false} className={`${classes.RetroTextArea} ${className}`}/>
    );
};

export default RetroTextArea;