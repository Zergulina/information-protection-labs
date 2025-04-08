import React, { useState } from 'react';

import classes from './GraphicKeyPage.module.css'
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import GraphicKey from '../../modules/GraphicKey/GraphicKey';
import GraphicKeyConsole from '../../modules/GraphicKeyConsole/GraphicKeyConsole';
import GraphicKeyUsers from '../../modules/GraphicKeyUsers/GraphicKeyUsers';
import { invoke } from '@tauri-apps/api/core';

const GraphicKeyPage = () => {
    const [users, setUsers] = useState<string[]>([]);
    const [newUser, setNewUser] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [keyBuffer, setKeyBuffer] = useState<number[]>([]);
    const [userToEnter, setUserToEnter] = useState<string>("");
    const [numberOfTries, setNumberOfTries] = useState<number>(0);

    const onNewUserAdding = (user: string) => {
        if (user == "") {
            setMessage(">>> Ошибка! Имя пользователя не должно быть пустым!");;
            return;
        }
        if (users.includes(user)) {
            setMessage(">>> Ошибка! Пользователь с заданным именем уже существует!");;
            return;
        }

        setMessage(">>> Введите графический ключ для регистрации пользователя");
        setNewUser(user);
    }

    const onSetUserToEnterHandler = (user: string) => {
        setMessage(`>>> Вход в пользователя ${user}. Введите графический ключ`);
        setUserToEnter(user);
    }

    const onGraphicKeyCompleteHandler = (newKey: number[]) => {
        if (userToEnter != "") {
            console.log("aegwe")
            invoke("read_file", { filename: `C:/Users/zergu/keys/${userToEnter}.txt` })
                .then(res => {
                    const loadedKey = (res as string).split(' ').map(Number);
                    let flag = true;
                    if (loadedKey.length == newKey.length) {
                        for (let i = 0; i < loadedKey.length; i++) {
                            if (loadedKey[i] != newKey[i]) {
                                flag = false;
                                break;
                            }
                        }
                    } else {
                        flag = false;
                    }
                    if (flag) {
                        setMessage(`>>> Вход в пользователя ${userToEnter} выполнен успешно`);
                        setNumberOfTries(0);
                        setUserToEnter("");
                    }
                    else if (numberOfTries < 2) {
                        setNumberOfTries(numberOfTries + 1);
                        setMessage(`>>> Ошибка! Неверный графический ключ! Осталось ${3 - numberOfTries - 1} попытки!`);
                    }
                    else {
                        setMessage(`>>> Ошибка! Попытки закончились, вход отклонен, подождите 3 секунды`);
                        setNumberOfTries(numberOfTries + 1);
                        setUserToEnter("")
                        setTimeout(() => {
                            setNumberOfTries(0);
                            setMessage(`>>> Можете попытаться войти снова`);
                        }, 3000)
                    }
                })
            return
        }
        console.log(keyBuffer.length, newKey.length)
        if (keyBuffer.length > 0) {
            let flag = true;
            if (keyBuffer.length == newKey.length) {
                console.log("abobafewf3wfw")
                for (let i = 0; i < keyBuffer.length; i++) {
                    console.log(keyBuffer[i], newKey[i])
                    if (keyBuffer[i] != newKey[i]) {
                        flag = false;
                        break;
                    }
                }
            } else {
                flag = false;
            }
            if (!flag) {
                setMessage(">>> Ошибка! Графические ключи не совпадают!");
            } else if (keyBuffer.length <= 2)  {
                setMessage(">>> Ошибка! Графический ключ должен состоять хотя бы из 3 точек!");
            } else {
                invoke("write_to_file", { name: `C:/Users/zergu/keys/${newUser}.txt`, line: newKey.join(' ') });
                setMessage(`>>> Пользователь ${newUser} зарегистрирован`);
                setUsers([...users, newUser]);
            }

            setNewUser("");
            setKeyBuffer([]);
            return;
        }
        if (newUser != "") {
            setKeyBuffer(newKey);
            setMessage(">>> Повторно введите графический ключ");
        }
    }


    return (
        <RetroLabeledPanel label="Лабораторная работа 5" labelZIndex={2} className={classes.GraphicKeyPage}>
            <div className={classes.GraphicKeyPageContainer}>
                <GraphicKeyUsers users={users} setNewUser={onNewUserAdding} setUserToEnter={onSetUserToEnterHandler}/>
                <GraphicKey isBlocked={numberOfTries == 3} onGraphicKeyComplete={onGraphicKeyCompleteHandler} />
                <GraphicKeyConsole message={message} setMessage={setMessage} />
            </div>
        </RetroLabeledPanel>
    );
};

export default GraphicKeyPage;