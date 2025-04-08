import React, { useState } from 'react';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import classes from './KeyboardPage.module.css'
import KeyboardStatisctics from '../../modules/KeyboardStatistics/KeyboardStatistics';
import GraphicKeyUsers from '../../modules/GraphicKeyUsers/GraphicKeyUsers';
import GraphicKeyConsole from '../../modules/GraphicKeyConsole/GraphicKeyConsole';
import { invoke } from '@tauri-apps/api/core';

const KeyboardPage = () => {
    const [secretPhrase, setSecretPhrase] = useState<string | null>("мама мыла раму");
    const [delays, setDelays] = useState<number[][]>([]);
    const [currentDelays, setCurrentDelays] = useState<number[]>([])
    const [message, setMessage] = useState<string | null>(null);
    const [users, setUsers] = useState<string[]>([]);
    const [newUser, setNewUser] = useState<string>("");
    const [userToEnter, setUserToEnter] = useState<string>("");

    const onNewUserAdding = (user: string) => {
        if (user == "") {
            setMessage(">>> Ошибка! Имя пользователя не должно быть пустым!");;
            return;
        }
        if (users.includes(user)) {
            setMessage(">>> Ошибка! Пользователь с заданным именем уже существует!");;
            return;
        }

        setMessage(">>> Введите секретную фразу 4 раза для регистрации пользователя");
        setNewUser(user);
    }

    const onEnterHandler = () => {
        if (newUser != "") {
            setCurrentDelays([]);
            if (delays.length + 1 < 4) {
                setDelays([...delays, currentDelays]);
                setMessage(`>>> Вы ввели секретную фразу ${delays.length + 1} раз`)
            } else {
                setMessage(`>>> Пользователь зарегистрирован`)
                setNewUser("");
                const ideals = [...delays, currentDelays].map(x => {
                    let sum = 0;
                    for (let i = 0; i < x.length; i++) {
                        sum += x[i];
                    }
                    return sum;
                })
                console.log([...delays, currentDelays]);
                console.log(ideals);
                setDelays([]);
                invoke("write_to_file", { name: `./${newUser}.txt`, line: currentDelays.join(' ') });
            }
        }
    }

    return (
        <RetroLabeledPanel label="Лабораторная работа 6" labelZIndex={2} className={classes.KeyboardPage}>
            <div className={classes.KeyboardPageContainer}>
                <GraphicKeyUsers users={users} setNewUser={onNewUserAdding}/>
                <KeyboardStatisctics delays={currentDelays} secretPhrase={secretPhrase} setDelays={setCurrentDelays} onInputEnter={onEnterHandler} />
                <GraphicKeyConsole message={message} setMessage={setMessage} />
            </div>
        </RetroLabeledPanel>
    );
};

export default KeyboardPage;