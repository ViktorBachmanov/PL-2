class Table {
    constructor(className) {
        this._elem = document.querySelector(className);

    }


    get elem() {
        return this._elem;
    }

    addRow(amount, period) {
        let row = document.createElement('tr');
        this.elem.append(row);

        this.addCell(row, amount);
        this.addCell(row, period);
        let rest = this.addCell(row, '');
        let profit = this.addCell(row, '');

        return [rest, profit];
    }

    addCell(row, content) {
        let cell = document.createElement('td');
        cell.textContent = content;
        row.append(cell);

        return cell;
    }
}


export default Table;