import React, {createContext, useReducer} from "react";
import Reducer from './reducer'

const initialState = {
    selectedCell: null,
    cellCount: 150,
    tables: [],
    draggedTable: null,
    loading: true
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