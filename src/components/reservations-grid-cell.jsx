import { useHistory } from "react-router-dom";
import useFindTableByCell from '../hooks/useFindTableByCell';
import GridTable from "./grid-table";

const ReservationsGridCell = ({cell}) => {
    const history = useHistory();
    const table = useFindTableByCell(cell);

    const cellClickHandler = (table) => {
      if(table) history.push(`/reservations/${table.id}`);
    };

    return (
      <div
        className="grid-item"
        key={cell}
        onClick={() => {
          cellClickHandler(table);
        }}
      >
        {table ? <GridTable table={table} draggable={false} /> : ""}
      </div>
    );
}

export default ReservationsGridCell;