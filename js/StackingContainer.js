import Stacking from './Stacking.js'


class StackingContainer {
    constructor() {
        this._stackings = [];
    }


    pushStacking(amount, period, returnCoin) {
        this._stackings.push(new Stacking(amount, period, returnCoin));
    }

    process() {
        for(let i = 0; i < this._stackings.length; i++) {
            let stackingIsDone = this._stackings[i].process();

            if(stackingIsDone) {
                this._stackings.splice(i, 1);
                i--;
            }
        }
    }

}


export default StackingContainer;