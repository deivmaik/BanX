'use strict';

// Data
const account1 = {
    owner: 'Guest',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Henderson',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 1111,
};

const account3 = {
    owner: 'Bruno',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 1111,
};

const account4 = {
    owner: 'Svend',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 1111,
};

const account5 = {
    owner: 'Sandra',
    movements: [200, 10000, 7000, -500, -900],
    interestRate: 1,
    pin: 1111,
};

const account6 = {
    owner: 'Michael',
    movements: [200, 10000, 7000, -500, -900],
    interestRate: 1,
    pin: 1111,
};


const accounts = [account1, account2, account3, account4, account5, account6,];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');






// BALANCE SECTION MANIPULATION

const displayMovements = function (movements, sort = false) {

    containerMovements.innerHTML = ' '
    // This line deletes the actual content before editing the DOM 

    // sorting
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        // If the movements are bigger than zero then is deposit, else is withdrawal
        const html = `
        <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1}-${' ' + type}</div>
                <div class="movements__value">${mov} €</div>
            </div>
        `;
        // This const changes the info inside the html 
        containerMovements.insertAdjacentHTML('afterbegin', html)
        // afterbegin makes the balance start from last to first
    });
}


// CURRENT BALANCE CALCULATOR

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} €`
    // acc = account 
    // acc,= accumulator
    // cur = current value  
}


// DEFINING USERNAMES

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0)
    labelSumIn.textContent = `${incomes} €`

    const out = acc.movements.filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0)
    labelSumOut.textContent = `${Math.abs(out)} €`
    // Math.abs deletes the negative sign 

    const interest = acc.movements.filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => { return int >= 1 })
        // this only pays the interest if the interest is over 1 
        .reduce((acc, int) => acc + int, 0)
    labelSumInterest.textContent = `${interest} €`
    // int = interest 
}


// DEFINING USERNAMES

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toLowerCase()
    })
}
// converts all the account owner names to lowercase , it says acc instead of account in order to not confuse them with the accounts const
createUsernames(accounts)
// To create the accounts for each owner


// USER LOGIN VERIFICATION 

let currentAccount

const updateUI = function (acc) {
    // Display movements 
    displayMovements(acc.movements)

    // Display balance 
    calcDisplayBalance(acc)

    // Display summary 
    calcDisplaySummary(acc)
}

btnLogin.addEventListener('click', function (e) {
    e.preventDefault()
    // This prevents the page from reloading, forms by default reload when submited 

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    )

    // Display the UI
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // inputs are strings, so the Number changes it from string to number 
        labelWelcome.textContent = `Welcome back!, ${currentAccount.owner.split(' ')[0]}`
        // this takes the name of the current account and selects the first part of the Array, so the name 
    }
    containerApp.style.opacity = 100
    // This turns the opacity from 0 % to 100 %

    // Clear input fields after login
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount)

})

// TRANSFER MONEY

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault()
    const amount = Number(inputTransferAmount.value)
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );

    inputTransferAmount.value = inputTransferTo.value = '';

    if (amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username) {

        // Transfer
        currentAccount.movements.push(-amount)
        receiverAcc.movements.push(amount)

        // Update UI
        updateUI(currentAccount)
    }
})


// LOAN FEATURE

btnLoan.addEventListener('click', function (e) {
    e.preventDefault()

    const amount = Number(inputLoanAmount.value)

    // must have atleast 10% of the loan in the current balance
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        // Add movement
        currentAccount.movements.push(amount)

        // Update UI
        updateUI(currentAccount)
    }
    inputLoanAmount.value = ' '
})



// DELETE ACCOUNT

btnClose.addEventListener('click', function (e) {
    e.preventDefault()
    // to prevent it from loading again

    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin) {
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
        );
        // Delete account 
        accounts.splice(index, 1)

        // Hide UI
        containerApp.style.opacity = 0
    }
    inputCloseUsername.value = inputClosePin.value = ''
});


// SORTING ARRAY 
let sorted = false

btnSort.addEventListener('click', function (e) {
    e.preventDefault()
    displayMovements(currentAccount.movements, !sorted)
    sorted = !sorted
})




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// DEPOSITS FUNCTION

const deposits = movements.filter(function (mov) {
    return mov > 0
})

// WITHDRAWALS FUNCTION
const withdrawals = movements.filter(mov => mov < 0)
// Its the same process but with an arrow function instead just for practice


// CURRENT BALANCE CALCULATOR

const balance = movements.reduce((acc, cur) => acc + cur, 0)
// acc= accumulator
// cur = current value
