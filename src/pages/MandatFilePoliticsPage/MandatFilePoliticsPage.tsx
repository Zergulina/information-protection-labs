import { useEffect, useState } from 'react';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import classes from './MandatFilePoliticsPage.module.css'
import FilePoliticsSetting from '../../modules/FilePoliticsSetting/FilePoliticsSetting';
import FilePoliticsUsers from '../../modules/FilePoliticsUsers/FilePoliticsUsers';
import MandatFilePolitics from '../../modules/MandatFilePolitics/MandatFilePolitics';
import { invoke } from '@tauri-apps/api/core';
import MandatFilePoliticsConsole from '../../modules/MandatFilePoliticsConsole/MandatFilePoliticsConsole';

const MandatFilePoliticsPage = () => {
    const [userAmount, setUserAmount] = useState<number>(0);
    const [users, setUsers] = useState<string[]>([])
    const [objects, setObjects] = useState<string[]>([])
    const [objectAmount, setObjectAmount] = useState<number>(0);
    const [userLevels, setUserLevels] = useState<number[]>([]);
    const [objectLevels, setObjectLevels] = useState<number[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (objectAmount < objects.length) {
            setObjects(objects.splice(objectAmount, objects.length - objectAmount));
            setObjectLevels(objectLevels.splice(objectAmount, objectLevels.length - objectAmount));
            for (var i = objectAmount; i <= objects.length; i++) {
                invoke("delete_file", {name: `C:/Users/zergu/source/foo/object${i + 1}.txt`})
            }
        } else if (objects.length < objectAmount) {
            var newObjects = [...objects];
            var newObjectLevels = [...objectLevels];
            for (var i = objects.length; i < objectAmount; i++) {
                newObjects.push(`Объект ${i + 1}`); 
                newObjectLevels.push(0);
                invoke("create_file", {name: `C:/Users/zergu/source/foo/object${i + 1}.txt`});
            }
            setObjectLevels(newObjectLevels);
            setObjects(newObjects);
        }
    }, [objectAmount])

    useEffect(() => {
        if (userAmount < users.length) {
            setUserLevels(userLevels.splice(userAmount, userLevels.length - userAmount));
            setUsers(users.splice(userAmount, users.length - userAmount));
        } else if (users.length < userAmount) {
            var newUsers = [...users];
            var newUserLevels = [...userLevels];
            for (var i = users.length; i < userAmount; i++) {
                newUsers.push(`Пользователь${i + 1}`); 
                newUserLevels.push(0);
            }
            setUsers(newUsers);
            setUserLevels(newUserLevels);
        }
    }, [userAmount])



    return (
        <RetroLabeledPanel label="Лабораторная работа 3" labelZIndex={2} className={classes.MandatFilePoliticsPage}>
            <div className={classes.MandatFilePoliticsPageContainer}>
                <FilePoliticsSetting setObjectAmount={setObjectAmount} setUserAmount={setUserAmount} className={classes.Settings} />
                <FilePoliticsUsers setMessage={setMessage} userAmount={userAmount} setUsers={setUsers} />
                <MandatFilePolitics entities={users} entityLevels={userLevels} setEntityLevels={setUserLevels} label='Доступы пользователей'/>
                <MandatFilePolitics entities={objects} entityLevels={objectLevels} setEntityLevels={setObjectLevels} label='Грифы объектов'/>
                <MandatFilePoliticsConsole users={users} userLevels={userLevels} objectLevels={objectLevels} message={message} setMessage={setMessage}/>
            </div>
        </RetroLabeledPanel>
    );
};

export default MandatFilePoliticsPage;