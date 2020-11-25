import {useContext} from 'react';
import { Context } from "../store";
import { updateTable } from "../firebase";
import useFindTableByCell from '../hooks/useFindTableByCell';
import GridTable from "./grid-table";

const LayoutGridCell = ({cell}) => {
    const [state, dispatch] = useContext(Context);
    const { draggedTable } = state;
    const table = useFindTableByCell(cell);
  
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
          {table ? <GridTable table={table} draggable={true} /> : ""}
        </div>
      );
}

export default LayoutGridCell;