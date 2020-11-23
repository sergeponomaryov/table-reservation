const useCellGrid = () => {
  const CELL_COUNT = 150;

  // generate a cell grid
  let cells = [];
  for (let i = 1; i <= CELL_COUNT; i++) {
    cells.push([]);
  }

  return cells;
};

export default useCellGrid;