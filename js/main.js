import { day, writingOffPeriod, period_koef } from './config.js';
import Wallet from './Wallet.js';
import StackingContainer from './StackingContainer.js';


let wallet;
const stackingContainer = new StackingContainer();


const amountInput = document.getElementById('amount');
const stackingButton = document.querySelector('.stacking-button');

const periodSelect = document.getElementById('period');
for(let key in period_koef) {
    let optionEl = document.createElement('option');
    optionEl.value = key;
    optionEl.textContent = key;
    periodSelect.append(optionEl);
}


document.addEventListener('keydown', function(event) {
    if(event.code == 'KeyD') {
        mineCoin();
    }
});


function mineCoin() {
    if(wallet === undefined) {
        wallet = new Wallet();

        amountInput.disabled = false;

        setInterval(processDay, day);
    }
    wallet.addCoin(1);
}


amountInput.oninput = function() {
    if(this.value <= 0)
        return;
        
    if(this.value >= wallet.amount) {
        stackingButton.disabled = true;
        this.parentNode.classList.add('smart-input_error');
    } else {
        stackingButton.disabled = false;
        this.parentNode.classList.remove('smart-input_error');
    }
}


stackingButton.onclick = function() {
    if(wallet === undefined)
        return;

    let amount = Number(amountInput.value);
    amountInput.value = '';
    this.disabled = true;

    if(amount > wallet.amount) {
        console.log('Error');
        return;
    }
    let period = periodSelect.value;

    wallet.removeCoin(amount);
    stackingContainer.pushStacking(amount, period, wallet.addCoin);
}

let dayCount = 0;
function processDay() {
    dayCount++;

    console.log(dayCount);

    if( !(dayCount % writingOffPeriod) ) {
        console.log('Списание');
        wallet.penalize();
    }

    stackingContainer.process();
}