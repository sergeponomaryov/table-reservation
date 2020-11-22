export const findCellTable = (tables, i) => {
    return tables.find(obj => {return obj.cell === i});
}