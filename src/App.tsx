import React, { useReducer } from 'react';
import { ActionType, Roll, WordActionType } from './ActionType';
import './App.css';

import Die from './Die';

import data from "./data.json";
const { Verb, Adjective, Secondary, Noun } = data;


// import die from './d12.svg';
const getNewRoll = (list: string[]): Roll => {
  let i = Math.floor(Math.random() * list.length);
  return {
    value: i,
    content: list[i]
  }
}

const verbRoll = getNewRoll(Verb);
const adjectiveRoll = getNewRoll(Adjective);
const secondaryRoll = getNewRoll(Secondary);
const nounRoll = getNewRoll(Noun);

const initialState = {
  verb: verbRoll,
  adjective: adjectiveRoll,
  secondary: secondaryRoll,
  noun: nounRoll
}

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case WordActionType.All:
      return {
        ...state,
        ...action.payload
      }
    case WordActionType.Adjective:
      return {
        ...state,
        adjective: action.payload
      }
    case WordActionType.Noun:
      return {
        ...state,
        noun: action.payload
      }
    case WordActionType.Secondary:
      return {
        ...state,
        secondary: action.payload
      }
    case WordActionType.Verb:
      return {
        ...state,
        verb: action.payload
      }
    default:
      throw new Error();
  }
}



function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { verb, adjective, secondary, noun } = state;

  const handleChange = (list: string[], actionType: WordActionType) => {
    const roll = getNewRoll(list);
    const action = {
      type: actionType,
      payload: roll
    }
    dispatch(action);
  }

  const rollAllDice = () => {
    const newRolls = {
      verb: getNewRoll(Verb),
      secondary: getNewRoll(Secondary),
      adjective: getNewRoll(Adjective),
      noun: getNewRoll(Noun)
    }
    const action: ActionType = {
      type: WordActionType.All,
      payload: newRolls
    }
    dispatch(action);
  }

  const phrase = `${verb.content} the ${adjective.content} ${secondary.content} ${noun.content}`;

  return (
    <div className="App">
      <h1>Technobabbler</h1>
      <div className="dice">
        <Die
          list={Verb}
          actionType={WordActionType.Verb}
          roll={verb}
          handleChange={handleChange} />
        <Die
          list={Adjective}
          actionType={WordActionType.Adjective}
          roll={adjective}
          handleChange={handleChange} />
        <Die
          list={Secondary}
          actionType={WordActionType.Secondary}
          roll={secondary}
          handleChange={handleChange} />
        <Die
          list={Noun}
          actionType={WordActionType.Noun}
          roll={noun}
          handleChange={handleChange} />
        <div>

          <button
            onClick={() => { rollAllDice(); }}
          >Roll All</button>
        </div>
      </div>
      <div>

      </div>
      <div className="phrase">
        {phrase}
      </div>

    </div>
  );
}

export default App;
