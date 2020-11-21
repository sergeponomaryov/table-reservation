import React, {createContext, useReducer} from "react";
import Reducer from './reducer'

const initialState = {
    selectedCell: null,
    cellCount: 150,
    cellData: [
        {
            cell: 26,
            number: 1,
            seats: 2
        },
        {
            cell: 13,
            number: 2,
            seats: 4
        },
        {
            cell: 78,
            number: 3,
            seats: 6
        }
    ]
};

export const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);