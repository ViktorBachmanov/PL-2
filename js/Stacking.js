import Table from './Table.js';
import { isEqual } from './util.js';
import { accuracy, period_koef } from './config.js';


class Stacking {
    constructor(amount, period, returnCoin) {
        this._amount = Number(amount);
        this._period = period;
        this._rest = period;
        this._returnCoin = returnCoin;
        
        this._isDone = false;

        this._profit = Stacking.evalProfit(this._amount, this._period);

        [this._restCell, this._profitCell] = Stacking.table.addRow(this._amount, this._period);
    }


    process() {
        this._rest--;
        if(isEqual(this._rest, 0)) {
            this._returnCoin(this._amount + this._profit);

            this._isDone = true;

            this._restCell.parentNode.classList.add('row_inactive');
        }

        this.repaint();

        return this._isDone;
    }

    repaint() {
        this._restCell.textContent = this._rest;
        this._profitCell.textContent = this._profit.toFixed(accuracy);
    }



}


Stacking.table = new Table('.main-table');
Stacking.evalProfit = (amount, period) => {
    let log = Math.log10(amount);
    let koef = period_koef[period];
    let profit = amount / 100 / log * koef;
    return  profit;
}


export default Stacking;