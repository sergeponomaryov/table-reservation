import { useHistory } from "react-router-dom";
import useFindTable from '../hooks/useFindTable';
import Table from "./table";

const ReservationsGridCell = ({cell}) => {
    const history = useHistory();
    const table = useFindTable(cell);

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
        {table ? <Table table={table} draggable={false} /> : ""}
      </div>
    );
}

export default ReservationsGridCell;