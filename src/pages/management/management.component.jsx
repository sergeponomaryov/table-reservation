import React, { useContext } from 'react';
import LayoutCell from '../../components/layout-cell/layout-cell.component'
import LayoutTableModal from '../../components/layout-table-modal/layout-table-modal.component'
import {Context} from '../../store'
import {findCellItem} from '../../selector'

import './management.style.css';

const Management = () => {

    const [state, dispatch] = useContext(Context);
    const {cellCount, cellData} = state;

    let cells = [];

    for (let i = 1; i <= cellCount; i++) {
        cells.push([]);
    }

    const cellClickHandler = (cellNumber) => {
        dispatch({type: 'SELECT_CELL', payload: cellNumber});
    };

    return (
    <div>
        <div className="grid-container">
        
        {
            cells.map((val, i) => <div className="grid-item" key={i} onClick={() => {
                cellClickHandler(i);
            }}>
                <LayoutCell item={findCellItem(cellData, i)}></LayoutCell>
            </div>)
        }

        </div>
        <LayoutTableModal />
    </div>
    )
}

export default Management;