import React, { useContext, useEffect, useState } from 'react';
import LayoutTableModal from '../../components/layout-table-modal/layout-table-modal.component'
import {Context} from '../../store'
import {findCellItem} from '../../selector'
import Table from '../../components/table/table.component'
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {authenticateAnonymously, getTables} from '../../firebase/firebase.utils'
import useAuth from '../../hooks/useAuth'

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
    const user = useAuth();
    const [state, dispatch] = useContext(Context);
    const {cellCount} = state;
    const [tables, setTables] = useState([]);

    let cells = [];
    for (let i = 1; i <= cellCount; i++) {
        cells.push([]);
    }

    useEffect(async () => {
        if(user) {
            const tables = await getTables(user.uid);
            setTables(tables);
        }
    });

    const findCellTable = (tables, i) => {
        return tables.find(obj => {return obj.cell === i});
    }

    const cellClickHandler = (cellNumber) => {
        dispatch({type: 'SELECT_CELL', payload: cellNumber});
    };

    return (
    <div>
        <div className="grid-container">
        
        {
            cells.map((val, i) => {
                const table = findCellTable(tables, i);
                return (<div className="grid-item" key={i} onClick={() => {
                        cellClickHandler(i);
                    }}>
                    <Paper className={classes.paper}>
                        {table ? <Table table={table} /> : "Empty"}
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