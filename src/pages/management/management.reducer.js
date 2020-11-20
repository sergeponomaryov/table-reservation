const ManagementReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_CELL':
            return {
                selectedCell: action.payload
            };
        default:
            return state;
    }
};

export default ManagementReducer;