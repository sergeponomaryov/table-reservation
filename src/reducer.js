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
        case 'SET_TABLE_RESERVATIONS':
            return {
                ...state,
                tableReservations: action.payload
            };
        case 'SET_DATE_RESERVATIONS':
            return {
                ...state,
                dateReservations: action.payload
            };
        case 'SET_FIREBASE_LOADING':
            return {
                ...state,
                firebaseLoading: action.payload
            };
        case 'OPEN_RESERVATION_MODAL':
            return {
                ...state,
                openReservationModal: action.payload
            };
        case 'SELECT_RESERVATION':
            return {
                ...state,
                selectedReservation: action.payload
            };
        case 'REFRESH_TABLES':
            return {
                ...state,
                // make this a new value each time we want to refresh data so that useEffect() in hook triggers
                // having true/false here would make it trigger twice if we set it to false within hook after data is fetched
                refreshTables: Date.now()
            };
        case 'REFRESH_RESERVATIONS':
            return {
                ...state,
                refreshReservations: Date.now()
            };
    }
};

export default Reducer;