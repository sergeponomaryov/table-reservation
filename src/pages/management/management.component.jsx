import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutCell from '../../components/layout-cell/layout-cell.component'
import LayoutTableModal from '../../components/layout-table-modal/layout-table-modal.component'

import './management.style.css';

const Management = () => {
  
    const cellsCount = 150;

    let cells = [];

    for (let i = 1; i <= cellsCount; i++) {
        cells.push([]);
    }

    const data = [
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

    const cellClickHandler = (cellNumber) => {
        console.log(cellNumber);
        // set selected cell...
      };

    return (
    <div>
        <div class="grid-container">
        
        {
            cells.map((val, i) => <div class="grid-item" onClick={() => {
                cellClickHandler(i);
            }}>
                <LayoutCell key={i} item={data.find(obj => {return obj.cell === i})}></LayoutCell>
            </div>)
        }

        </div>
        <LayoutTableModal></LayoutTableModal>
    </div>
    )
}

export default Management;