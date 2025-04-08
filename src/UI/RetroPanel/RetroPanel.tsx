import { ReactNode } from 'react';
import classes from './RetroPanel.module.css'

type RetroPanel = {
    children: ReactNode,
    className? : string,
    style: any
}

const RetroPanel = ({children, className, style} : RetroPanel) => {
return (
        <div className={`${classes.RetroPanel} ${className}`} style={style}>
            {children}
        </div>
    );
};

export default RetroPanel;