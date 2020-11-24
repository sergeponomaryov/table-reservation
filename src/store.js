import React, {createContext, useReducer} from "react";
import Reducer from './reducer'

const initialState = {
    firebaseLoading: true,
    selectedCell: null,
    tables: [],
    draggedTable: null,
    refreshTables: false,
    openReservationModal: false,
    selectedReservation: null,
    tableReservations: [],
    refreshReservations: false,
    dateReservations: [],
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