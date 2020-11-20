import React, {createContext, useReducer} from "react";
import ManagementReducer from './management.reducer'

const initialState = {
    selectedCell: null
};

export const ManagementContainer = ({children}) => {
    const [state, dispatch] = useReducer(ManagementReducer, initialState);
    return (
        <ManagementContext.Provider value={[state, dispatch]}>
            {children}
        </ManagementContext.Provider>
    )
};

export const ManagementContext = createContext(initialState);