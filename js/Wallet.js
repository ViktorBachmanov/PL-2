import { accuracy } from './config.js';



class Wallet {
    constructor() {
        this._amount = 0;

        this._displayEl = document.getElementById('wallet');


        this.addCoin = this.addCoin.bind(this);

        this.repaint();
    }


    get amount() {
        return this._amount;
    }

    addCoin(val) {
        this._amount += val;
        this.repaint();
    }

    removeCoin(val) {
        this._amount -= val;
        this.repaint();
    }

    penalize() {
        let penalty = Math.log(this._amount);

        this.removeCoin(penalty);
    }

    repaint() {
        this._displayEl.textContent = this.amount.toFixed(accuracy);
    }

    
}


export default Wallet;