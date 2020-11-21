import React, { useContext } from 'react';
import LayoutCell from '../../components/layout-cell/layout-cell.component'
import LayoutTableModal from '../../components/layout-table-modal/layout-table-modal.component'
import {Context} from '../../store'
import {findCellItem} from '../../selector'
import Table from '../../components/table/table.component'
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import './management.style.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '95%'
    },
  }));

const Management = () => {

    const classes = useStyles();
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
            cells.map((val, i) => {
                const item = findCellItem(cellData, i);
                return (<div className="grid-item" key={i} onClick={() => {
                        cellClickHandler(i);
                    }}>
                    <Paper className={classes.paper}>
                        {item ? <Table table={item} /> : "Empty"}
                    </Paper>
                </div>)
            })
        }

        </div>
        <LayoutTableModal />
    </div>
    )
}

export default Management;