import React, { useEffect, useState } from 'react';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import FilePoliticsSetting from '../../modules/FilePoliticsSetting/FilePoliticsSetting';
import FilePoliticsUsers from '../../modules/FilePoliticsUsers/FilePoliticsUsers';
import FilePoliticsMatrix from '../../modules/FilePoliticsMatrix/FilePoliticsMatrix';
import FilePoliticsConsole from '../../modules/FilePoliticsConsole/FilePoliticsConsole';
import classes from './FilePoliticsPage.module.css'

const FilePoliticsPage = () => {
    const [userAmount, setUserAmount] = useState<number>(0);
    const [users, setUsers] = useState<string[]>([])
    const [objectAmount, setObjectAmount] = useState<number>(0);
    const [filePoliticsMatrix, setFilePolitcsMatrix] = useState<number[][]>([]);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        let newFilePoliticsMatrix = [...filePoliticsMatrix]
        if (filePoliticsMatrix.length - 1 > userAmount) {
            newFilePoliticsMatrix = (filePoliticsMatrix.slice(0, userAmount - filePoliticsMatrix.length + 1))
        } else {
            for (let i = 0; i < userAmount - filePoliticsMatrix.length + 1; i++) {
                let newRow = new Array<number>()
                newFilePoliticsMatrix.push(newRow);
            }
        }

        const prevObjectAmount = newFilePoliticsMatrix[0].length;

        if (newFilePoliticsMatrix.length == 0) return;
        if (newFilePoliticsMatrix[0].length > objectAmount) {
            for (let i = 0; i < newFilePoliticsMatrix.length; i++) {
                newFilePoliticsMatrix[i] = newFilePoliticsMatrix[i].slice(0, objectAmount - prevObjectAmount)
            }
        } else {
            const prevLength = newFilePoliticsMatrix[0].length
            for (let j = 0; j < objectAmount - prevLength; j++) {
                newFilePoliticsMatrix[0].push(7);
            }
            for (let i = 1; i < newFilePoliticsMatrix.length; i++) {
                const prevLength = newFilePoliticsMatrix[i].length
                for (let j = 0; j < objectAmount - prevLength; j++) {
                    newFilePoliticsMatrix[i].push(0);
                }
            }
        }

        setFilePolitcsMatrix(newFilePoliticsMatrix)
    }, [userAmount, objectAmount])


    return (
        <RetroLabeledPanel label="Лабораторная работа 2" labelZIndex={2} className={classes.FilePoliticsPage}>
            <div className={classes.FilePoliticsPageContainer}>
                <FilePoliticsSetting setObjectAmount={setObjectAmount} setUserAmount={setUserAmount} className={classes.Settings} />
                <FilePoliticsUsers setMessage={setMessage} userAmount={userAmount} setUsers={setUsers} />
                <FilePoliticsMatrix filePoliticsMatrix={filePoliticsMatrix} setFilePolitcsMatrix={setFilePolitcsMatrix} className={classes.Matrix}/>
                <FilePoliticsConsole users={users} filePoliticsMatrix={filePoliticsMatrix} setFilePoliticsMatrix={setFilePolitcsMatrix} message={message} setMessage={setMessage}/>
            </div>
        </RetroLabeledPanel>
    );
};

export default FilePoliticsPage;