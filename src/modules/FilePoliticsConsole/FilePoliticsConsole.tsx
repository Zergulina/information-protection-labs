import { useEffect, useState } from 'react';
import RetroInput from '../../UI/RetroInput/RetroInput';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import classes from './FilePoliticsConsole.module.css'

type FilePoliticsConsoleProps = {
    users: string[],
    filePoliticsMatrix: number[][],
    setFilePoliticsMatrix: (value: number[][]) => void,
    message: string | null,
    setMessage: (value: string | null) => void
}

const FilePoliticsConsole = ({ users, filePoliticsMatrix, setFilePoliticsMatrix, message, setMessage}: FilePoliticsConsoleProps) => {
    const [consoleLog, setConsoleLog] = useState<string[]>([]);
    const [consoleInput, setConsoleInput] = useState<string>("> ");
    const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null)
    const [currentCommand, setCurrentCommand] = useState<string | null>(null)
    const [grantPolicyObjectNumber, setGrantPolicyObjectNumber] = useState<number | null>(null)
    const [grantPolicyString, setGrantPolicyString] = useState<string | null>(null)

    const commands = ["read", "write", "grant"]

    useEffect(() => {
        if (message != null) {
            setConsoleLog([message, ...consoleLog])
            console.log("c");
            setMessage(null);
        }
    }, [message])

    const SetConsoleInputHandler = (newValue: string) => {
        setConsoleInput(newValue.length < 2 ? String("> ") : newValue);
    }

    const decimalPoliticsToBinary = (decimal: number) => [(decimal >> 2) & 1, (decimal >> 1) & 1, decimal & 1]
    const binaryPoliticsToString = (binary: number[]) => !binary.includes(1) ? "Полный запрет" : !binary.includes(0) ? "Полный доступ" : `${binary[0] == 1 ? "Чтение" : ""} ${binary[1] == 1 ? "Запись" : ""} ${binary[2] == 1 ? "Передача прав" : ""}`

    const inputEnterHandler = () => {
        let addString = [`${currentUserIndex != null ? (currentUserIndex == 0 ? "root" : users[currentUserIndex - 1]) : ""}> ${consoleInput.substring(2)}`];
        setConsoleInput("> ");

        if (grantPolicyString != null) {
            const userNameSubstring = consoleInput.substring(2);
            if (users.includes(userNameSubstring)) {
                const userIndex = users.findIndex(el => el == userNameSubstring) + 1;
                let matrix = [...filePoliticsMatrix]
                console.log(matrix)
                matrix[userIndex][grantPolicyObjectNumber as number -1] |= (1 << (2 - commands.findIndex((el) => el == grantPolicyString)))
                console.log(matrix[userIndex][grantPolicyObjectNumber as number - 1] | (1 << (2 - commands.findIndex((el) => el == grantPolicyString))))
                console.log(matrix)
                setFilePoliticsMatrix(matrix);
                addString = ['SYSTEM>> Операция выполнена успешно.', ...addString]
            }
            else {
                addString = ['SYSTEM>> Ошибка! Неизвестный пользователь.', ...addString]
            }
            setGrantPolicyString(null);
            setGrantPolicyObjectNumber(null);
            setConsoleLog([...addString, ...consoleLog]);
            return;
        }

        if (grantPolicyObjectNumber != null) {
            const commandSubstring = consoleInput.substring(2);
            if (commands.includes(commandSubstring)) {
                const commandIndex = commands.findIndex(el => el == commandSubstring);
                if (decimalPoliticsToBinary(filePoliticsMatrix[currentUserIndex as number][grantPolicyObjectNumber - 1])[commandIndex] == 1) {
                    setGrantPolicyString(commands[commandIndex])
                    addString = ['SYSTEM>> Выберите пользователя для передачи прав.', ...addString]
                }
                else {
                    addString = ['SYSTEM>> Нет доступа для выполнения операции.', ...addString]
                }
            } else {
                addString = ['SYSTEM>> Ошибка! Неизвестная команда.', ...addString]
                setGrantPolicyObjectNumber(null);
            }
            setConsoleLog([...addString, ...consoleLog]);
            return;
        }

        if (currentCommand != null) {
            switch (currentCommand) {
                case "read": {
                    const objectNumber = Number.parseInt(consoleInput.substring(2))
                    if (!objectNumber || objectNumber > filePoliticsMatrix[0].length) {
                        addString = ['SYSTEM>> Ошибка! Недопустимый номер объекта.', ...addString]
                    }
                    else {
                        if (decimalPoliticsToBinary(filePoliticsMatrix[currentUserIndex as number][objectNumber - 1])[0] == 1) {
                            addString = ['SYSTEM>> Операция выполнена успешно.', ...addString]
                        }
                        else {
                            addString = ['SYSTEM>> Нет доступа для выполнения операции.', ...addString]
                        }
                    }
                    break;
                }
                case "write": {
                    const objectNumber = Number.parseInt(consoleInput.substring(2))
                    if (!objectNumber || objectNumber > filePoliticsMatrix[0].length) {
                        addString = ['SYSTEM>> Ошибка! Недопустимый номер объекта.', ...addString]
                    }
                    else {
                        if (decimalPoliticsToBinary(filePoliticsMatrix[currentUserIndex as number][objectNumber - 1])[1] == 1) {
                            addString = ['SYSTEM>> Операция выполнена успешно.', ...addString]
                        }
                        else {
                            addString = ['SYSTEM>> Нет доступа для выполнения операции.', ...addString]
                        }
                    }
                    break;
                }
                case "grant": {
                    const objectNumber = Number.parseInt(consoleInput.substring(2))
                    if (!objectNumber || objectNumber > filePoliticsMatrix[0].length) {
                        addString = ['SYSTEM>> Ошибка! Недопустимый номер объекта.', ...addString]
                    }
                    else {
                        if (decimalPoliticsToBinary(filePoliticsMatrix[currentUserIndex as number][objectNumber - 1])[2] == 1) {
                            addString = ['SYSTEM>> Какое право Вы хотите передать?.', ...addString]
                            setGrantPolicyObjectNumber(objectNumber);
                        }
                        else {
                            addString = ['SYSTEM>> Нет доступа для выполнения операции.', ...addString]
                        }
                    }
                    break;
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
                    addString = ["Перечень Ваших прав:", `SYSTEM>> Добро пожаловать, пользователь ${users[userIndex]}.`, ...addString]
                    for (let j = 0; j < filePoliticsMatrix[userIndex + 1].length; j++) {
                        addString = [`Объект ${j + 1}: ${binaryPoliticsToString(decimalPoliticsToBinary(filePoliticsMatrix[userIndex + 1][j]))}`, ...addString]
                    }
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
                    addString = [`SYSTEM>> Над каким объектом прозводится операция?`];
                    setCurrentCommand("read");
                    break;
                }
                case "write": {
                    addString = [`SYSTEM>> Над каким объектом прозводится операция?`];
                    setCurrentCommand("write");
                    break;
                }
                case "grant": {
                    addString = [`SYSTEM>> Над каким объектом прозводится операция?`];
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
        <RetroLabeledPanel label='Консоль' labelZIndex={0} className={classes.FilePoliticsConsole}>
            <div className={classes.ConsoleLog}>
                {
                    consoleLog.map(el => <div className={classes.ConsoleLogUnit}>{el}</div>)
                }
            </div>
            <RetroInput value={consoleInput} setValue={SetConsoleInputHandler} className={classes.Input} onEnterKey={inputEnterHandler} />
        </RetroLabeledPanel>
    );
};

export default FilePoliticsConsole;