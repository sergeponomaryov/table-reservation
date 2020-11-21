const Reducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_CELL':
            return {
                ...state,
                selectedCell: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;