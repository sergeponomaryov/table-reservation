import React, { useContext } from "react";
import { Context } from "../store";
import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: "50%",
    color: "white",
    paddingTop: "10px",
  },
}));

const GridTable = ({ table, draggable }) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);

  function dragStartHandler(e, table) {
    dispatch({ type: "SET_DRAGGED_TABLE", payload: table.id });
    e.dataTransfer.effectAllowed = "move";
    // e.dataTransfer.setData("text/html", e.target.parentNode);
    // e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }

  return (
    <Badge
      color="secondary"
      overlap="circle"
      badgeContent={table.seats}
      draggable={draggable}
      onDragStart={(e) => dragStartHandler(e, table)}
    >
      <div className={clsx(classes.shape, classes.shapeCircle)}>
        {table.number}
      </div>
    </Badge>
  );
};

export default GridTable;
