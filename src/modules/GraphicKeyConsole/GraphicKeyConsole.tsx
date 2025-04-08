import React, { useEffect, useState } from 'react';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import classes from './GraphicKeyConsole.module.css'


const GraphicKeyConsole = ({message, setMessage} : {message: string | null, setMessage : (newMessage: string | null) => void}) => {
    const [consoleLog, setConsoleLog] = useState<string[]>([]);

    useEffect(() => {
        if (message != null) {
            setConsoleLog([message as string, ...consoleLog]);
            setMessage(null);
        }
    }, [message])

    return (
        <RetroLabeledPanel label='Консоль' labelZIndex={0} className={classes.GraphicKeyConsole}>
            <div className={classes.ConsoleLog}>
                {
                    consoleLog.map(el => <div className={classes.ConsoleLogUnit}>{el}</div>)
                }
            </div>
        </RetroLabeledPanel>
    );
};

export default GraphicKeyConsole;