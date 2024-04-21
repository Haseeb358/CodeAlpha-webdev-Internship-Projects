let form = document.querySelector("#form");
let transactionHistory = document.querySelector(".TransactionHistory");
let incomebutton = document.querySelector("#incomebtn");
let expensebutton = document.querySelector("#expensebtn");
let balance = document.querySelector("#balance");
let incomeBalance = document.querySelector("#income");
let expenseBalance = document.querySelector("#expense");

// -----------------------------------
let ButtonClicked = "";
incomebutton.addEventListener("click", () => {
  ButtonClicked = "income";
});
expensebutton.addEventListener("click", () => {
  ButtonClicked = "expense";
});

let isupdate = false;
let updaedIndex = -1;

const workOnSubmit = (e) => {
  let Description = e.target.description.value;
  let Amount = e.target.amount.value;
  let Date = e.target.date.value;
  let buttonC = ButtonClicked;

  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  if (isupdate) {
    userData[updaedIndex].description = Description;
    userData[updaedIndex].amount = Amount;
    userData[updaedIndex].date = Date;
    userData[updaedIndex].buttonC = buttonC;

    isupdate = false;
  } else {
    userData.push({
      description: Description,
      amount: Amount,
      date: Date,
      buttonC: ButtonClicked,
    });
  }

  localStorage.setItem("userDetails", JSON.stringify(userData));

  e.target.reset();
  displayData();
  TotalBalances();

  e.preventDefault();
};
form.addEventListener("submit", workOnSubmit);

const displayData = () => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  let finalData = "";

  userData.forEach((element, index) => {
    finalData =
      finalData +
      `<div class="items">
      <h3>${element.description}</h3>
    <h3>RS <span>${
      element.buttonC === "income"
        ? " +" + element.amount
        : " -" + element.amount
    }</span></h3>
    <h3>${element.date}</h3>
    <div class="updateitems">
    <h2 onclick="removeTransaction(${index})">&times</h2>
    <i
              class="fa-solid fa-pencil"
              onclick="UpdateTransaction(${index})"
            ></i>
    </div>
    </div>`;
  });
  transactionHistory.innerHTML = finalData;
};

const removeTransaction = (index) => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  userData.splice(index, 1);
  localStorage.setItem("userDetails", JSON.stringify(userData));
  displayData();
  TotalBalances();
};
const UpdateTransaction = (index) => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  let desInputid = document.querySelector("#desid");
  let AmountInputid = document.querySelector("#AmountInputid");
  let DateInputid = document.querySelector("#DateInputid");

  desInputid.value = userData[index].description;
  AmountInputid.value = userData[index].amount;
  DateInputid.value = userData[index].date;

  updaedIndex = index;
  isupdate = true;
};
const TotalBalances = () => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  let IncomeTotal = userData.filter((val) => {
    return val.buttonC === "income" ? val.amount : "";
  });

  let totalofIncomeis = IncomeTotal.reduce(
    (acc, curr) => acc + parseFloat(curr.amount),
    0
  );
  incomeBalance.innerText = totalofIncomeis;

  let ExpenseTotal = userData.filter((val) => {
    return val.buttonC === "expense" ? val.amount : "";
  });

  let totalofExpense = ExpenseTotal.reduce(
    (acc, curr) => acc + parseFloat(curr.amount),
    0
  );
  expenseBalance.innerText = totalofExpense;

  let totalBalance = totalofIncomeis - totalofExpense;
  balance.innerText = totalBalance;
};

TotalBalances();
displayData();
