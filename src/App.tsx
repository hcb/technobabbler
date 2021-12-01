import React, { useReducer } from 'react';
import { ActionType, Roll, WordActionType } from './ActionType';
import './App.css';

import miles from './miles.png';
import geordi from './geordi.png';

import data from "./data.json";
import Die from './Die';
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
  noun: nounRoll,
  saved: [] as string[]
}

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case WordActionType.Save:
      return {
        ...state,
        saved: [...state.saved, action.payload]
      }
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

const engineer = Math.round(Math.random()) === 0 ? geordi: miles;

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { verb, adjective, secondary, noun, saved } = state;

  const handleChange = (list: string[], actionType: WordActionType) => {
    const roll: Roll = getNewRoll(list);
    const action = {
      type: actionType,
      payload: roll
    }
    dispatch(action as ActionType);
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

  const savePhrase = (phrase: string) => {
    if (state.saved.indexOf(phrase) > -1) {
      return;
    }
    const action: ActionType = {
      type: WordActionType.Save,
      payload: phrase
    }
    dispatch(action);
  }

  const phrase = `${verb.content} the ${adjective.content} ${secondary.content} ${noun.content}`;

  const savedList = saved.map((value, i) => {
    return (
      <li key={i}>{value}</li>
    )
  })

  return (
    <div className="App">
      <h1>Technobabbler</h1>
      <div className="generator">
        <div className="engineer">
          <img src={engineer} alt="Miles O'Brien Approved!" style={{ maxWidth: "300px" }} />
        </div>

        <div>
          <div className="phrase">
            {phrase}
          </div>

          {saved && saved.length > 0 &&
            <ul className="saved">
              {savedList}
            </ul>
          }
        </div>
      </div>


      <div className="dice">
        <div className="individual">
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
        </div>

        <div className="controls">
          <button className="roll-all"
            onClick={() => { rollAllDice(); }}
          >Roll All</button>
          <button className="save"
            onClick={() => { savePhrase(phrase); }}>
            Save
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
