import React from 'react';
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import RetroLabel from '../../UI/RetroLabel/RetroLabel';
import RetroButton from '../../UI/RetroButton/RetroButton';
import classes from './MandatFilePolitics.module.css'

type MandatFilePolitics = {
    entities: string[],
    entityLevels: number[],
    setEntityLevels: (value: number[]) => void,
    label: string,
}

const MandatFilePolitics = ({ entities, setEntityLevels, entityLevels, label }: MandatFilePolitics) => {
    const handleGenerateButton = () => {
        let newEntityLevels = [...entityLevels]
        for (let i = 0; i < newEntityLevels.length; i++) {
            newEntityLevels[i] = Math.floor(Math.random() * 6)
        }
        setEntityLevels(newEntityLevels)
        console.log(newEntityLevels);
    }

    return (
        <RetroLabeledPanel label={label} labelZIndex={1}>
            <div className={classes.MandatFilePoliticsContaier}>
            {
                entities.map((user,index) => 
                <div>
                    <RetroLabel labelZIndex={0}>{user + ":" + entityLevels[index].toString()}</RetroLabel>
                </div>
                )
            }
            <RetroButton onClick={handleGenerateButton} className={classes.Button}>Перегенерировать</RetroButton>
            </div>
        </RetroLabeledPanel>
    );
};

export default MandatFilePolitics;