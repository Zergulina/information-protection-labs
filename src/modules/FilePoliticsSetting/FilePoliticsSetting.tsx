import { useState } from 'react';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import RetroLabel from '../../UI/RetroLabel/RetroLabel';
import classes from './FilePoliticsSetting.module.css'
import RetroInput from '../../UI/RetroInput/RetroInput';
import RetroButton from '../../UI/RetroButton/RetroButton';

type FilePoliticsSettingProps = {
    setUserAmount: (value: number) => void,
    setObjectAmount: (value: number) => void,
    className?: string
}

const FilePoliticsSetting = ({ setUserAmount, setObjectAmount, className }: FilePoliticsSettingProps) => {
    const [bufferUserNumber, setBufferUserNumber] = useState<number>(0);
    const [bufferObjectNumber, setBufferObjectNumber] = useState<number>(0);

    const handleUserNumberInput = (newValue: string) => {
        if (newValue.length == 0) {
            setBufferUserNumber(0);
            return
        }
        if (/^\d*$/.test(newValue) && newValue.length < 7) {
            setBufferUserNumber(Number.parseInt(newValue));
        }
    }

    const handleObjectNumberInput = (newValue: string) => {
        if (newValue.length == 0) {
            setBufferObjectNumber(0);
            return
        }
        if (/^\d*$/.test(newValue) && newValue.length < 7) {
            setBufferObjectNumber(Number.parseInt(newValue));
        }
    }

    const handleConfirmButton = () => {
        setUserAmount(bufferUserNumber)
        setObjectAmount(bufferObjectNumber)
    }

    return (
        <RetroLabeledPanel label='Настройки системы' labelZIndex={1} className={`${classes.FilePoliticsSetting} ${className}`}>
            <div className={classes.FilePoliticsSettingContainer}>
                <div className={classes.Row}>
                    <RetroLabel labelZIndex={0} className={classes.UserAmountInputLabel}>Количество пользователей:</RetroLabel>
                    <div className={classes.InputContainer} >
                        <RetroInput value={bufferUserNumber.toString()} setValue={handleUserNumberInput} className={classes.Input} />
                    </div>
                </div>
                <div className={classes.Row}>
                    <RetroLabel labelZIndex={0} className={classes.ObjectAmountInputLabel}>Количество объектов:</RetroLabel>
                    <div className={classes.InputContainer} >
                        <RetroInput value={bufferObjectNumber.toString()} setValue={handleObjectNumberInput} className={classes.Input} />
                    </div>
                </div>
                <RetroButton onClick={handleConfirmButton} className={classes.Button}>Применить</RetroButton>
            </div>
        </RetroLabeledPanel>
    );
};

export default FilePoliticsSetting; 