export const findCellTable = (tables, i) => {
    return tables.find(obj => {return obj.cell === i});
}

export const findTableByNumber = (cellData, number) => {
    return cellData.find(obj => {return obj.number === number});
}