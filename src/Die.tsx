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
            <div className="die">
                <p className="roll">{roll.value}</p>
            </div>
            <button
                onClick={(e: any) => handleChange(list, actionType)}>Roll</button>
            <p>{roll.content}</p>
        </div>
    );
}

export default Die;
