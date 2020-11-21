export const findCellItem = (cellData, i) => {
    return cellData.find(obj => {return obj.cell === i});
}

export const findTableByNumber = (cellData, number) => {
    return cellData.find(obj => {return obj.number === number});
}