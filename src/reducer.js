import {findTableByNumber} from './selector';

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_CELL':
            return {
                ...state,
                selectedCell: action.payload
            };
        case 'SAVE_TABLE':
        {
            let table = findTableByNumber(state.cellData, action.payload.number);
            if(!table) table = action.payload;
            return {
                ...state,
                selectedCell: action.payload
            };
        }
        case 'SET_TABLES':
            return {
                tables: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;