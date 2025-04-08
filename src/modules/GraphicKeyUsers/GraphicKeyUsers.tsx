import React, { useState } from 'react';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import RetroPanel from '../../UI/RetroPanel/RetroPanel';
import RetroLabel from '../../UI/RetroLabel/RetroLabel';
import RetroButton from '../../UI/RetroButton/RetroButton';
import RetroInput from '../../UI/RetroInput/RetroInput';
import classes from './GraphicKeyUsers.module.css'

const GraphicKeyUsers = ({ users, setNewUser, setUserToEnter }: { users: string[], setNewUser: (value: string) => void, setUserToEnter: (value: string) => void  }) => {
    const [newUsername, setNewUsername] = useState<string>("");

    return (
        <RetroLabeledPanel label='Пользователи' labelZIndex={1} className={classes.GraphicKeyUsers}>
            <div className={classes.Container}>
                <RetroPanel style={{}} className={classes.UsersContainer}>
                    {
                        users.map(user =>
                            <div>
                                <RetroLabel labelZIndex={0}>{user}</RetroLabel>
                                <RetroButton onClick={() => setUserToEnter(user)}>Войти</RetroButton>
                            </div>
                        )
                    }
                </RetroPanel>
                <div className={classes.InputWrapper}>
                    <div className={classes.InputLabelContainer}>
                        <RetroLabel labelZIndex={0} className={classes.InputLabel}>Новый пользователь:</RetroLabel>
                    </div>
                    <div className={classes.InputContainer}>
                        <RetroInput value={newUsername} setValue={setNewUsername} className={classes.Input}/>
                    </div>
                </div>
                <RetroButton onClick={() => setNewUser(newUsername)} className={classes.Button}>Добавить</RetroButton>
            </div>
        </RetroLabeledPanel>
    );
};

export default GraphicKeyUsers;