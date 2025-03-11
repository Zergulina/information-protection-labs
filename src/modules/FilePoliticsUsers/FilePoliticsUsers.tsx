import { useEffect, useState } from 'react';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import RetroLabel from '../../UI/RetroLabel/RetroLabel';
import RetroInput from '../../UI/RetroInput/RetroInput';
import classes from './FilePoliticsUsers.module.css'
import RetroButton from '../../UI/RetroButton/RetroButton';
import RetroPanel from '../../UI/RetroPanel/RetroPanel';

type FilePoliticsUsersProps = {
    setUsers: (value: string[]) => void,
    setMessage: (value: string) => void,
    userAmount: number,
    className?: string
}

const FilePoliticsUsers = ({ setUsers, setMessage, userAmount, className }: FilePoliticsUsersProps) => {
    const [usersBuffer, setUsersBuffer] = useState<string[]>([]);

    useEffect(() => {
        if (usersBuffer.length > userAmount) setUsersBuffer(usersBuffer.slice(0, userAmount - usersBuffer.length))
        else {
            let newUsers = [...usersBuffer]
            for (let i = usersBuffer.length; i < userAmount; i++) {
                newUsers.push("Пользователь" + (i + 1))
            }
            setUsersBuffer(newUsers)
        }
    }, [userAmount])


    const handleConfirmButton = () => {
        if (usersBuffer.length != (new Set(usersBuffer)).size) {
            setMessage("Ошибка! Имена пользователей должны быть уникальными!")
            console.log("a")
            return
        }
        if (usersBuffer.includes("root")) {
            setMessage("Ошибка! Невозможно создать пользователя root!")
            console.log("b")
            return
        }
        setUsers(usersBuffer)
    }

    return (
        <RetroLabeledPanel label='Пользователи' labelZIndex={1}>
            <div className={classes.FilePoliticsUsersContainer}>
                <RetroPanel className={classes.Panel}>
                    {
                        usersBuffer.map((userName, index) =>
                            <div className={classes.Row}>
                                <RetroLabel labelZIndex={0} className={classes.Label}>{"Пользователь " + (index + 1).toString() + ":"}</RetroLabel>
                                <div className={classes.InputContainer} >
                                    <RetroInput value={userName} setValue={(value: string) => { let newUsersBuffer = [...usersBuffer]; newUsersBuffer[index] = value; setUsersBuffer(newUsersBuffer); }} className={classes.Input} />
                                </div>
                            </div>)
                    }
                </RetroPanel>
                <RetroButton onClick={handleConfirmButton} className={classes.Button}>Применить</RetroButton>
            </div>
        </RetroLabeledPanel>
    );
};

export default FilePoliticsUsers;