import Table from './Table.js';
import { isEqual } from './util.js';
import { accuracy, period_koef } from './config.js';


class Stacking {
    constructor(amount, period, returnCoin) {
        this._amount = Number(amount);
        this._period = Number(period);
        this._returnCoin = returnCoin;

        this._profit = 0;

        this._daysCount = 0;
        
        this._isDone = false;

        [this._restCell, this._profitCell] = Stacking.table.addRow(this._amount, this._period);

        this.repaint();
    }

    get rest() {
        return this._period - this._daysCount;
    }

    process() {
        this._daysCount++;

        this._profit = Stacking.evalProfit(this._amount, this._period, this._daysCount);

        if(isEqual(this._daysCount, this._period)) {
            this._returnCoin(this._amount + this._profit);

            this._isDone = true;

            this._restCell.parentNode.classList.add('row_inactive');
        }

        this.repaint();

        return this._isDone;
    }

    repaint() {
        this._restCell.textContent = this.rest;

        this._profitCell.textContent = this._profit.toFixed(accuracy);
    }
}


Stacking.table = new Table('.main-table');
Stacking.evalProfit = (amount, period, daysCount) => {
    let log = Math.log10(amount);
    let koef = period_koef[period];
    let daysRatio = daysCount / period;
    let profit = amount * log * koef * daysRatio / 100;
    return  profit;
}


export default Stacking;