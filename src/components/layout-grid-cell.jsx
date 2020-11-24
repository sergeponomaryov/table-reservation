import {useContext} from 'react';
import { Context } from "../store";
import { updateTable } from "../firebase";
import useFindTable from '../hooks/useFindTable';
import Table from "./table";

const LayoutGridCell = ({cell}) => {
    const [state, dispatch] = useContext(Context);
    const { draggedTable } = state;
    const table = useFindTable(cell);
  
    const cellClickHandler = (cellNumber) => {
        dispatch({ type: "SELECT_CELL", payload: cellNumber });
    };
    
    function dropHandler(cell) {
        // move dragged table to that cell
        updateTable(draggedTable, { cell }).then(() => {
        dispatch({ type: "REFRESH_TABLES" });
        });
    }

    return (
        <div
          className="grid-item"
          key={cell}
          onClick={() => {
            cellClickHandler(cell);
          }}
          onDrop={() => dropHandler(cell)}
          onDragOver={(e) => e.preventDefault()}
        >
          {table ? <Table table={table} draggable={true} /> : ""}
        </div>
      );
}

export default LayoutGridCell;