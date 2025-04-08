import { ReactNode } from 'react';
import RetroLabel from '../../UI/RetroLabel/RetroLabel';
import RetroPanel from '../../UI/RetroPanel/RetroPanel';
import classes from './RetroLabeledPanel.module.css'

type RetroLabeledPanel = {
    label: string,
    labelZIndex: number,
    children: ReactNode,
    className?: string
    style? : any,
}

const RetroLabeledPanel = ({ label, labelZIndex, children, className, style }: RetroLabeledPanel) => {
    return (
        <RetroPanel className={`${classes.RetroPanel} ${className}`} style={style}>
            <RetroLabel className={classes.Label} labelZIndex={labelZIndex}>{label}</RetroLabel>
            {children}
        </RetroPanel>
    );
};

export default RetroLabeledPanel;