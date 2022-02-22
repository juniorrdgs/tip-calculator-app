let billInput = document.querySelector('.bill-input');
let btns = document.querySelectorAll('.tip-btn');
let custom = document.querySelector('.btn-custom');
let peopleInput = document.querySelector('.people-input');
let tipRate = document.querySelector('.tip-input');
let totalRate = document.querySelector('.total-input');
let reset = document.querySelector('.reset-btn');

let bill;
let people;
let tipAmount;
let totalAmount;
let tip;

window.onload = function loadEvents() {
    billInput.addEventListener('change', function () {
        bill = parseFloat(billInput.value);
        enableReset();
        //return bill;
    });

    peopleInput.addEventListener('change', () => {
        people = parseInt(peopleInput.value);
        //return people;
        enableReset();
    });

    setInterval(() => { Calc(); }, 1000);
}

const enableReset = () => {
    if (reset.disabled) {
        reset.disabled = false;
    }
}

const tipSelect = (event) => {
    if (event.target.classList.contains('btn-custom')) {
        let tipCustom = prompt("Choose custom tip (%):");
        if (typeof tipCustom != Number) {
            tipCustom = prompt("Letters aren't allowed, enter a numeric custom tip!");
        }
        tip = tipCustom / 100;
        tip = parseFloat(tip);
        for (i = 0; i < btns.length; i++) {
            btns[i].classList.remove('active');
        }
        event.target.classList.add('active');
        enableReset();
    } else {
        tip = event.target.value;
        tip = parseFloat(tip);
        for (i = 0; i < btns.length; i++) {
            btns[i].classList.remove('active');
        }
        custom.classList.remove('active');
        event.target.classList.add('active');
        enableReset();
    }
}

const tipAmountCalc = () => {
    tipAmount = ((bill * tip) / people);
    tipAmount = parseFloat(tipAmount);
}

const totalRateCalc = () => {
    totalAmount = (bill / people) + tipAmount;
    totalAmount = parseFloat(totalAmount);
    tipRate.innerText = '$' + tipAmount.toFixed(2);
    totalRate.innerText = '$' + totalAmount.toFixed(2);
}

const resetAll = () => {
    billInput.value = 0;
    peopleInput.value = 0;
    tip = null;
    tipAmount = 0;
    for (i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
    if (custom.classList.contains('active')) {
        custom.classList.remove('active');
    }
    tipRate.innerText = '$0.00';
    totalRate.innerText = '$0.00';
    reset.disabled = true;
}

const Calc = () => {
    if (billInput.value != 0 && billInput != undefined && peopleInput.value != 0 && peopleInput.value != NaN && tip != undefined) {
        tipAmountCalc();
        totalRateCalc();
    }
}