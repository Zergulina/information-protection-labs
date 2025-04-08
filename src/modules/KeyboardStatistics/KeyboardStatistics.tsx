import React, { useState } from 'react';
import RetroInput from '../../UI/RetroInput/RetroInput';

type KeyboardStatisticsProps = {
    delays: number[],
    setDelays: (value: number[]) => void,
    secretPhrase: string | null,
    onInputEnter: () => void,
}

const KeyboardStatistics = ({ delays, setDelays, secretPhrase, onInputEnter }: KeyboardStatisticsProps) => {
    const [currentInput, setCurrentInput] = useState<string | null>(null);
    const [timer, setTimer] = useState(() => {
        let lastTime: number | null = null;

        return () => {
            const now = Date.now();
            const timeDiff = lastTime ? now - lastTime : null;
            lastTime = now;
            return timeDiff;
        };
    });

    const onCurrentInputHandler = (newValue: string) => {
        let currentTimer = timer();
        if (currentTimer == null) {

        }
        else {
            console.log(currentTimer)
            setDelays([...delays, currentTimer])
        }
        setCurrentInput(newValue)
    };

    const onEnterHandler = () => {
        if (currentInput == secretPhrase) {
            setTimer(() => {
                let lastTime: number | null = null;

                return () => {
                    const now = Date.now();
                    const timeDiff = lastTime ? now - lastTime : null;
                    lastTime = now;
                    return timeDiff;
                };
            });
            onInputEnter();
            setCurrentInput("");
            console.log("a")
        } else {
            console.log("b")
        }
    }

    const onBackspaceHandler = () => {
        setDelays(delays.slice(0, -1));
        if (currentInput != null) setCurrentInput(currentInput.slice(0, -1));
        timer()
    }

    return (
        <div>
            <RetroInput value={currentInput != null ? currentInput : ""} setValue={onCurrentInputHandler} onEnterKey={onEnterHandler} onBackspaceKey={onBackspaceHandler} />
        </div>
    );
};

export default KeyboardStatistics;