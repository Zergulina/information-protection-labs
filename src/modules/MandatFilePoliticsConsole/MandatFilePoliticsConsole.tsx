import { useEffect, useState } from 'react';
import RetroInput from '../../UI/RetroInput/RetroInput';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import classes from './MandatFilePoliticsConsole.module.css'
import { invoke } from '@tauri-apps/api/core';

type MandatFilePoliticsConsoleProps = {
    users: string[],
    userLevels: number[],
    objectLevels: number[],
    message: string | null,
    setMessage: (value: string | null) => void
}

const MandatFilePoliticsConsole = ({ users, userLevels, objectLevels, message, setMessage}: MandatFilePoliticsConsoleProps) => {
    const [consoleLog, setConsoleLog] = useState<string[]>([]);
    const [consoleInput, setConsoleInput] = useState<string>("> ");
    const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null)
    const [currentObjectIndex, setCurrentObjectIndex] = useState<number | null>(null)
    const [currentCommand, setCurrentCommand] = useState<string | null>(null)

    useEffect(() => {
        if (message != null) {
            setConsoleLog([message, ...consoleLog])
            setMessage(null);
        }
    }, [message])

    const SetConsoleInputHandler = (newValue: string) => {
        setConsoleInput(newValue.length < 2 ? String("> ") : newValue);
    }

    const inputEnterHandler = () => {
        let addString = [`${currentUserIndex != null ? (currentUserIndex == 0 ? "root" : users[currentUserIndex - 1]) : ""}> ${consoleInput.substring(2)}`];
        setConsoleInput("> ");

        if (currentObjectIndex != null) {
            const inputLineSubstring = consoleInput.substring(2);
            invoke("write_to_file", {name: `C:/Users/zergu/source/foo/object${currentObjectIndex}.txt`, line: inputLineSubstring})
            setConsoleLog(['SYSTEM>> Операция выполнена успешно.', ...consoleLog])
            setCurrentObjectIndex(null);
            return;
        }

        if (currentCommand != null) {
            switch (currentCommand) {
                case "read": {
                    const objectNumber = Number.parseInt(consoleInput.substring(2))
                    if (!objectNumber || objectNumber > objectLevels.length) {
                        addString = ['SYSTEM>> Ошибка! Недопустимый номер объекта.', ...addString]
                    }
                    else {
                        if (userLevels[currentUserIndex as number - 1] >= objectLevels[objectNumber as number]) {
                            console.log(userLevels[currentUserIndex as number], objectLevels[objectNumber as number])
                            invoke("read_file", {filename: `C:/Users/zergu/source/foo/object${objectNumber}.txt`}).then(res => {
                                addString = ['SYSTEM>> Операция выполнена успешно.', 'SYSTEM>> ' + res as string, ...addString]
                                setCurrentCommand(null);
                                setConsoleLog([...addString, ...consoleLog])
                                return
                            })
                        }
                        else {
                            addString = ['SYSTEM>> Нет доступа для выполнения операции.', ...addString]
                        }
                    }
                    break;
                }
                case "write": {
                    const objectNumber = Number.parseInt(consoleInput.substring(2))
                    if (!objectNumber || objectNumber > objectLevels.length) {
                        addString = ['SYSTEM>> Ошибка! Недопустимый номер объекта.', ...addString]
                    }
                    else {
                        if (userLevels[currentUserIndex as number - 1] <= objectLevels[objectNumber as number]) {
                            addString = ['SYSTEM>> Напишите строку для добавления в файл.', ...addString]
                        }
                        else {
                            addString = ['SYSTEM>> Нет доступа для выполнения операции.', ...addString]
                        }
                    }
                    setCurrentObjectIndex(objectNumber);
                    break;
                }
                default: {
                    addString = ['SYSTEM>> Ошибка! Недопустимая команда.', ...addString]
                }
            }
            setCurrentCommand(null);
            setConsoleLog([...addString, ...consoleLog])
            return;
        }

        if (currentUserIndex == null) {
            if (consoleInput.substring(2) == "root") {
                setCurrentUserIndex(0)
                addString = ['SYSTEM>> Добро пожаловать, администратор.', ...addString]
            }
            else {
                const userNameSubstring = consoleInput.substring(2);
                if (users.includes(userNameSubstring)) {
                    const userIndex = users.findIndex(el => el == userNameSubstring);
                    setCurrentUserIndex(userIndex + 1)
                    addString = [`SYSTEM>> Добро пожаловать, пользователь ${users[userIndex]}.`, ...addString]
                    // for (let j = 0; j < filePoliticsMatrix[userIndex + 1].length; j++) {
                    //     addString = [`Объект ${j + 1}: ${binaryPoliticsToString(decimalPoliticsToBinary(filePoliticsMatrix[userIndex + 1][j]))}`, ...addString]
                    // }
                }
                else {
                    addString = ['SYSTEM>> Ошибка! Неизвестный пользователь.', ...addString]
                }
            }
        } else {
            const command = consoleInput.substring(2);
            switch (command) {
                case "quit": {
                    addString = [`SYSTEM>> Работа пользователя ${currentUserIndex > 0 ? users[currentUserIndex - 1] : "root"} завершена. До свидания.`, ...addString];
                    setCurrentUserIndex(null);
                    break;
                }
                case "read": {
                    addString = [`SYSTEM>> Над каким объектом прозводится операция?`, ...addString];
                    setCurrentCommand("read");
                    break;
                }
                case "write": {
                    addString = [`SYSTEM>> Над каким объектом прозводится операция?`, ...addString];
                    setCurrentCommand("write");
                    break;
                }
                case "grant": {
                    addString = [`SYSTEM>> Над каким объектом прозводится операция?`, ...addString];
                    setCurrentCommand("grant");
                    break;
                }
                default: {
                    addString = ['SYSTEM>> Неизвестная команда.', ...addString];
                }
            }
        }
        setConsoleLog([...addString, ...consoleLog])
    }

    return (
        <RetroLabeledPanel label='Консоль' labelZIndex={0} className={classes.MandatFilePoliticsConsole}>
            <div className={classes.ConsoleLog}>
                {
                    consoleLog.map(el => <div className={classes.ConsoleLogUnit}>{el}</div>)
                }
            </div>
            <RetroInput value={consoleInput} setValue={SetConsoleInputHandler} className={classes.Input} onEnterKey={inputEnterHandler} />
        </RetroLabeledPanel>
    );
};

export default MandatFilePoliticsConsole;