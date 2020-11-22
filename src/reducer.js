const Reducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_CELL':
            return {
                ...state,
                selectedCell: action.payload
            };
        case 'SET_DRAGGED_TABLE':
            return {
                ...state,
                draggedTable: action.payload
            };
        case 'SET_TABLES':
            return {
                ...state,
                tables: action.payload
            };
        case 'SET_FIREBASE_LOADING':
            return {
                ...state,
                firebaseLoading: action.payload
            };
    }
};

export default Reducer;