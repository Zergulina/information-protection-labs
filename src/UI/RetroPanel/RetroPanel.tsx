import { ReactNode } from 'react';
import classes from './RetroPanel.module.css'

type RetroPanel = {
    children: ReactNode,
    className? : string,
}

const RetroPanel = ({children, className} : RetroPanel) => {
return (
        <div className={`${classes.RetroPanel} ${className}`}>
            {children}
        </div>
    );
};

export default RetroPanel;