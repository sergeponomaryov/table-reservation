export const findCellItem = (cellData, i) => {
    return cellData.find(obj => {return obj.cell === i});
}