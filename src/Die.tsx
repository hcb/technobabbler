import React from 'react';
import { Roll, WordActionType } from './ActionType';

import './Die.css';

interface DieProps {
    list: string[],
    actionType: WordActionType,
    roll: Roll,
    handleChange: (list: string[], action: WordActionType) => void
}

const Die = ({ list, actionType, roll, handleChange }: DieProps) => {
    return (
        <div className="die-wrapper">
            <p>{roll.content}</p>
            <div className="die">
                <span className="roll">{roll.value + 1}</span>
            </div>
            <button
                onClick={(e: any) => handleChange(list, actionType)}>Roll</button>

        </div>
    );
}

export default Die;
