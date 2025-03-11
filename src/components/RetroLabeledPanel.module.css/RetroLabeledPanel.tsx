import { ReactNode } from 'react';
import RetroLabel from '../../UI/RetroLabel/RetroLabel';
import RetroPanel from '../../UI/RetroPanel/RetroPanel';
import classes from './RetroLabeledPanel.module.css'

type RetroLabeledPanel = {
    label: string,
    labelZIndex: number,
    children: ReactNode,
    className?: string
}

const RetroLabeledPanel = ({ label, labelZIndex, children, className }: RetroLabeledPanel) => {
    return (
        <RetroPanel className={`${classes.RetroPanel} ${className}`}>
            <RetroLabel className={classes.Label} labelZIndex={labelZIndex}>{label}</RetroLabel>
            {children}
        </RetroPanel>
    );
};

export default RetroLabeledPanel;