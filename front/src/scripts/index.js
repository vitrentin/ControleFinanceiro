toastr.options.progressBar = true;
toastr.options.closeDuration = 300;
toastr.options.closeButton = true;

var transactionType = "Entrada";
var isEditing = false;
var income = 0;
var outcome = 0;
var balance = 0;
var transaction;
var elements = [];
var categories = [];
var transactions = [];
var filteredTransactions = [];

const incomeField = document.getElementsByClassName("Income")[0];
const outcomeField = document.getElementsByClassName("Outcome")[0];
const balanceField = document.getElementsByClassName("Balance")[0];

const storagedUser = localStorage.getItem('@ControleFinanceiro:user');
const storagedToken = localStorage.getItem('@ControleFinanceiro:token');
console.log(storagedUser)
const userId = JSON.parse(storagedUser).id;
console.log(userId)

fetch(`http://localhost:3000/categories`, {
  method: "GET",
  headers: {
    userId:userId
  },
})
  .then((response) => response.json())
  .then((allCategories) => {
    const select = document.getElementsByClassName("Categories")[0];
    allCategories.map((category) => {
      categories.push(category);
      const newOption = document.createElement("option");
      newOption.innerText = category.name;
      newOption.value = category.name;
      newOption.setAttribute("id", category.name);

      select.appendChild(newOption);
    });
  });

fetch(`http://localhost:3000/transactions`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${storagedToken}`,
    'Content-Type': 'application/json',
    userId

  },

})
  .then((response) => response.json())
  .then((allTransactions) => {
    const table = document.getElementById("bodyTable");
    allTransactions.map((transaction) => {
      const newTr = document.createElement("tr");
      const newTitleTd = document.createElement("td");
      const newTransactionTd = document.createElement("td");
      const newCategoryTd = document.createElement("td");
      const newDateTd = document.createElement("td");
      const newTimeTd = document.createElement("td");

      const dateObj = new Date(transaction.created_at);
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      const time = dateObj.toLocaleTimeString();

      const formattedTransaction = {
        id: transaction.id,
        title: transaction.title,
        value: transaction.value,
        category: transaction.category,
        transactionType: transaction.transactionType,
        date: formattedDate,
        time,
      };

      ElementsRow = {
        id: transaction.id,
        newTitleTd,
        newTransactionTd,
        newCategoryTd,
        newDateTd,
        newTimeTd,
        newTr,
      };

      transactions.push(formattedTransaction);
      elements.push(ElementsRow);
      const select = document.getElementsByClassName("Categories")[0];

      newTr.onclick = () => {
        isEditing = true;
        document.getElementsByClassName("Title")[0].value =
          formattedTransaction.title;
        document.getElementsByClassName("Value")[0].value = formatCurrencyValue(
          formattedTransaction.value
        );
        document.getElementsByClassName("Category")[0].value =
          formattedTransaction.category;
        select.value = transaction.category;
        transaction = formattedTransaction;
        openTransactionModal(formattedTransaction);
      };

      newTr.style.cursor = "pointer";
      newTitleTd.classList.add("FirstTdTransactionTable");
      newTransactionTd.classList.add(
        transaction.transactionType === "Entrada"
          ? "DepositTransactionType"
          : "WithdrawTransactionType"
      );
      newCategoryTd.classList.add("tdTransactionTable");
      newDateTd.classList.add("tdTransactionTable");
      newTimeTd.classList.add("tdTransactionTable");

      newTitleTd.innerHTML = transaction.title;
      newTransactionTd.innerHTML = formatCurrencyValue(transaction.value);
      newCategoryTd.innerHTML = formattedTransaction.category;
      newDateTd.innerHTML = formattedDate;
      newTimeTd.innerHTML = time;

      table.appendChild(newTr);
      newTr.appendChild(newTitleTd);
      newTr.appendChild(newTransactionTd);
      newTr.appendChild(newCategoryTd);
      newTr.appendChild(newDateTd);
      newTr.appendChild(newTimeTd);

      transaction.transactionType === "Entrada"
        ? (income += transaction.value)
        : (outcome += transaction.value);
    });

    balance = income - outcome;
    const formattedIncome = formatCurrencyValue(income.toFixed(2));
    const formattedOutcome = formatCurrencyValue(outcome.toFixed(2));
    const formattedBalance = formatCurrencyValue(balance.toFixed(2));

    incomeField.innerText = formattedIncome;
    outcomeField.innerText = formattedOutcome;
    balanceField.innerText = formattedBalance;
  });

VMasker(document.querySelector("input[data-type='currency']")).maskMoney({
  precision: 2,
  separator: ",",
  delimiter: ".",
  unit: "R$",
});

const formatCurrencyValue = (value) => {
  if (String(value).split(".").length === 1) {
    return `R$ ${String(value).concat(",00")}`;
  } else if (String(value).split(".")[1].split("").length === 1) {
    formattedValue =
      `${String(value).replace(".", ",").split(",")[0]},` +
      String(value).replace(".", ",").split(",")[1].padEnd(2, "0");

    return `R$ ${String(formattedValue)}`;
  } else {
    return `R$ ${String(value).replace(".", ",")}`;
  }
};

const updateTransaction = () => {
  const title = document.getElementsByClassName("Title")[0].value;
  const value = document.getElementsByClassName("Value")[0].value;
  const category = document.getElementsByClassName("Category")[0].value;
  let formattedPrice;

  if (isNaN(Number(value))) {
    formattedPrice = value.replaceAll(".", "").replace(",", ".").split("R$")[1];
  } else {
    formattedPrice = Number(value);
  }

  if (title === "" || formattedPrice === "" || category === "") {
    document.getElementsByClassName("ModalContainer")[0].style.maxHeight =
      "650px";
    if (title === "") {
      const p = document.getElementById("title_error");
      p.style.display = "block";
      p.innerText = "Digite um título";
    }

    if (value === "") {
      const p = document.getElementById("value_error");
      p.style.display = "block";
      p.innerText = "Digite um valor";
    }

    if (category === "") {
      const p = document.getElementById("category_error");
      p.style.display = "block";
      p.innerText = "Selecione uma categoria";
    }

    return;
  }

  fetch(`http://localhost:3000/transactions/${transaction.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      value: Number(formattedPrice),
      transactionType: transactionType === "Entrada" ? "Entrada" : "Saída",
      category: category,
    }),
  })
    .then((response) => response.json())
    .then((transaction) => {
      const dateObj = new Date(transaction.created_at);
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      const time = dateObj.toLocaleTimeString();

      const formattedTransaction = {
        id: transaction.id,
        title: transaction.title,
        value: transaction.value,
        category: transaction.category,
        transactionType: transaction.transactionType,
        date: formattedDate,
        time,
      };

      const elementsRow = elements
        .map((row) => {
          if (row.id === transaction.id) {
            return row;
          }
        })
        .filter((element) => element !== undefined);
      const newFilteredTransactionsList = filteredTransactions.map(
        (transaction) => {
          if (transaction.id === formattedTransaction.id) {
            console.log(transaction)
            return formattedTransaction;
          }
          return transaction;
        }
      );
      income = 0;
      outcome = 0;

      const newTransactionsList = transactions.map((transaction) => {
        if (transaction.id === formattedTransaction.id) {
          transaction.transactionType === "Entrada"
          ? (income += formattedTransaction.value)
          : (outcome += formattedTransaction.value);
          return formattedTransaction;
        }else{
          transaction.transactionType === "Entrada"
          ? (income += transaction.value)
          : (outcome += transaction.value);
        return transaction;
        }
      });
      transactions = newTransactionsList;
      filteredTransactions = newFilteredTransactionsList;
      const { newTitleTd, newTransactionTd, newCategoryTd, newTr } =
        elementsRow[0];

      newTitleTd.innerText = title;
      newTransactionTd.innerHTML = `${value}`;
      newCategoryTd.innerHTML = category;
      newTr.onclick = () => {
        isEditing = true;
        document.getElementsByClassName("Title")[0].value = title;
        document.getElementsByClassName("Value")[0].value = value;
        document.getElementsByClassName("Category")[0].value = category;
        transactionType =
          transaction.transactionType === "Entrada" ? "Entrada" : "Saída";
        transaction = formattedTransaction;
        openTransactionModal(formattedTransaction);
      };

      if (transaction.transactionType === "Entrada") {
        newTransactionTd.classList.add("DepositTransactionType");
        newTransactionTd.classList.remove("WithdrawTransactionType");
      } else if (transaction.transactionType === "Saída") {
        newTransactionTd.classList.add("WithdrawTransactionType");
        newTransactionTd.classList.remove("DepositTransactionType");
      }

      toastr.success("Transação atualizada com sucesso!");

      balance = income - outcome;
      console.log(balance)

      const formattedIncome = formatCurrencyValue(income.toFixed(2));
      const formattedOutcome = formatCurrencyValue(outcome.toFixed(2));
      const formattedBalance = formatCurrencyValue(balance.toFixed(2));

      incomeField.innerText = formattedIncome;
      outcomeField.innerText = formattedOutcome;
      balanceField.innerText = formattedBalance;
      console.log(formattedBalance)

      closeTransactionModal();
    });
};

const openTransactionModal = (row) => {
  transaction = row;
  document.getElementsByClassName("ModalOverlay")[0].style.display = "flex";
  if (isEditing) {
    document.getElementsByClassName("RegisterTransaction")[0].style.display =
      "none";
    document.getElementsByClassName("EditTransaction")[0].style.display =
      "inline";
    document.getElementsByClassName("EditTransaction")[1].style.display =
      "inline";

    if (row?.transactionType === "Saída") {
      document.getElementsByClassName("Button")[0].classList.remove("deposit");
      document.getElementsByClassName("Button")[1].classList.add("withdraw");
    }
  } else {
    document.getElementsByClassName("RegisterTransaction")[0].style.display =
      "inline";
    document.getElementsByClassName("EditTransaction")[0].style.display =
      "none";
    document.getElementsByClassName("EditTransaction")[1].style.display =
      "none";
  }
};

const closeTransactionModal = () => {
  isEditing = false;
  transactionType = "Entrada";
  document.getElementsByClassName("Button")[0].classList.add("deposit");
  document.getElementsByClassName("Button")[1].classList.remove("withdraw");
  document.getElementsByClassName("ModalOverlay")[0].style.display = "none";
  document.getElementsByClassName("Title")[0].value = "";
  document.getElementsByClassName("Value")[0].value = "";
  document.getElementsByClassName("Category")[0].value = "";

  const pTitle = document.getElementById("title_error");
  const pValue = document.getElementById("value_error");
  const pCategory = document.getElementById("category_error");

  pTitle.style.display = "none";
  pValue.style.display = "none";
  pCategory.style.display = "none";

  document.getElementsByClassName("ModalContainer")[0].style.maxHeight =
    "588px";
};

const registerTransaction = () => {
  const title = document.getElementsByClassName("Title")[0];
  const value = document.getElementsByClassName("Value")[0];
  const category = document.getElementsByClassName("Category")[0];

  const formattedPrice = value.value
    .replaceAll(".", "")
    .replace(",", ".")
    .split("R$")[1];

  if (title.value === "" || formattedPrice === "" || category.value === "") {
    if (title.value === "") {
      const p = document.getElementById("title_error");
      p.style.display = "block";
      p.innerText = "Digite um título";
    }

    if (value.value === "") {
      const p = document.getElementById("value_error");
      p.style.display = "block";
      p.innerText = "Digite um valor";
    }

    if (category.value === "") {
      const p = document.getElementById("category_error");
      p.style.display = "block";
      p.innerText = "Selecione uma categoria";
    }

    return;
  }

  const typeOfTransaction = transactionType;

  const dateObj = new Date();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  const time = dateObj.toLocaleTimeString();

  let element;
  fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      value: Number(formattedPrice),
      transactionType: transactionType,
      category: category.value,
      userId: userId
    }),
  })
    .then((response) => response.json())
    .then((transaction) => {
      element = transaction;
    })
    .then(() => {
      const table = document.getElementById("bodyTable");

      const newTr = document.createElement("tr");
      const newTitleTd = document.createElement("td");
      const newTransactionTd = document.createElement("td");
      const newCategoryTd = document.createElement("td");
      const newDateTd = document.createElement("td");
      const newTimeTd = document.createElement("td");

      const formattedTransaction = {
        id: element.id,
        title: title.value,
        value: value.value,
        category: category.value,
        transactionType: typeOfTransaction,
        date: formattedDate,
        time,
      };

      const ElementsRow = {
        id: element.id,
        newTitleTd,
        newTransactionTd,
        newCategoryTd,
        newDateTd,
        newTimeTd,
        newTr,
      };

      transactions.push(formattedTransaction);
      elements.push(ElementsRow);

      newTr.onclick = () => {
        isEditing = true;
        document.getElementsByClassName("Title")[0].value =
          formattedTransaction.title;
        document.getElementsByClassName("Value")[0].value =
          formattedTransaction.value;
        document.getElementsByClassName("Category")[0].value =
          formattedTransaction.category;

        transaction = formattedTransaction;
        openTransactionModal(formattedTransaction);
      };

      newTr.style.cursor = "pointer";
      newTitleTd.classList.add("FirstTdTransactionTable");
      newTransactionTd.classList.add(
        transactionType === "Entrada"
          ? "DepositTransactionType"
          : "WithdrawTransactionType"
      );
      newCategoryTd.classList.add("tdTransactionTable");
      newDateTd.classList.add("tdTransactionTable");
      newTimeTd.classList.add("tdTransactionTable");

      newTitleTd.innerHTML = title.value;
      newTransactionTd.innerHTML = value.value;
      newCategoryTd.innerHTML = formattedTransaction.category;
      newDateTd.innerHTML = formattedDate;
      newTimeTd.innerHTML = time;

      table.appendChild(newTr);
      newTr.appendChild(newTitleTd);
      newTr.appendChild(newTransactionTd);
      newTr.appendChild(newCategoryTd);
      newTr.appendChild(newDateTd);
      newTr.appendChild(newTimeTd);

      if (formattedTransaction.transactionType === "Entrada") {
        income = Number(formattedPrice) + income;
        balance += Number(formattedPrice);

        incomeField.innerText = formatCurrencyValue(income.toFixed(2));
        balanceField.innerText = formatCurrencyValue(balance.toFixed(2));
      } else {
        outcome = Number(formattedPrice) + outcome;
        balance -= Number(formattedPrice);

        outcomeField.innerText = formatCurrencyValue(outcome.toFixed(2));
        balanceField.innerText = formatCurrencyValue(balance.toFixed(2));
      }

      toastr.success("Transação cadastrada com sucesso!");
      closeTransactionModal();
    });
};

const handleChangeTransactionType = (string) => {
  const hasDeposit = document.getElementsByClassName("Entrada")[0];
  const hasWithdraw = document.getElementsByClassName("Saída")[0];

  if (string === "withdraw" && !hasWithdraw) {
    document.getElementsByClassName("Button")[0].classList.remove("deposit");
    document.getElementsByClassName("Button")[1].classList.add("withdraw");

    transactionType = "Saída";

    if (isEditing) {
      transaction.transactionType = "Saída";
    }
  } else if (string === "deposit" && !hasDeposit) {
    document.getElementsByClassName("Button")[1].classList.remove("withdraw");
    document.getElementsByClassName("Button")[0].classList.add("deposit");

    transactionType = "Entrada";

    if (isEditing) {
      transaction.transactionType = "Entrada";
    }
  }
};

const deleteTransaction = () => {
  fetch(`http://localhost:3000/transactions/${transaction.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((transaction) => {
      const elementsRow = elements
        .map((row) => {
          if (row.id === transaction.id) {
            return row;
          }
        })
        .filter((element) => element !== undefined);

      const { newTr } = elementsRow[0];
      newTr.remove();

      if (transaction.transactionType === "Entrada") {
        income = -Number(transaction.value) + income;
        balance -= Number(transaction.value);

        incomeField.innerText = formatCurrencyValue(income.toFixed(2));
        balanceField.innerText = formatCurrencyValue(balance.toFixed(2));
      } else {
        outcome = Number(transaction.value) - outcome;
        balance += Number(transaction.value);

        outcomeField.innerText = formatCurrencyValue(outcome.toFixed(2));
        balanceField.innerText = formatCurrencyValue(balance.toFixed(2));
      }

      const newElementsRow = elements.filter(
        (element) => element.id !== transaction.id
      );

      elements = newElementsRow;

      const newTransactionsList = transactions.filter(
        (el) => el.id !== transaction.id
      );
      transactions = newTransactionsList;

      toastr.success("Transação deletada com sucesso!");
      closeTransactionModal();
    });
};

const filterTransactions = (string) => {
  const transactionsFiltered = transactions
    .map((transaction) => {
      const normalizedTitle = transaction.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const normalizedString = string
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (normalizedTitle.includes(normalizedString)) {
        return transaction;
      }
    })
    .filter((el) => el !== undefined);

  filteredTransactions = transactionsFiltered;

  const table = document.getElementById("bodyTable");
  table.innerHTML = "";

  transactionsFiltered.map((transaction) => {
    const newTr = document.createElement("tr");
    const newTitleTd = document.createElement("td");
    const newTransactionTd = document.createElement("td");
    const newCategoryTd = document.createElement("td");
    const newDateTd = document.createElement("td");
    const newTimeTd = document.createElement("td");

    const dateObj = new Date(transaction.created_at);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const time = dateObj.toLocaleTimeString();

    const formattedTransaction = {
      id: transaction.id,
      title: transaction.title,
      value: transaction.value,
      category: transaction.category,
      transactionType: transaction.transactionType,
      date: formattedDate,
      time,
    };

    ElementsRow = {
      id: transaction.id,
      newTitleTd,
      newTransactionTd,
      newCategoryTd,
      newDateTd,
      newTimeTd,
      newTr,
    };

    const select = document.getElementsByClassName("Categories")[0];

    newTr.onclick = () => {
      isEditing = true;
      document.getElementsByClassName("Title")[0].value =
        formattedTransaction.title;
      document.getElementsByClassName("Value")[0].value =
        formattedTransaction.value;
      document.getElementsByClassName("Category")[0].value =
        formatCurrencyValue(formattedTransaction.category);
      select.value = transaction.category;
      transaction = formattedTransaction;
      openTransactionModal(formattedTransaction);
    };

    newTr.style.cursor = "pointer";
    newTitleTd.classList.add("FirstTdTransactionTable");
    newTransactionTd.classList.add(
      transaction.transactionType === "Entrada"
        ? "DepositTransactionType"
        : "WithdrawTransactionType"
    );
    newCategoryTd.classList.add("tdTransactionTable");
    newDateTd.classList.add("tdTransactionTable");
    newTimeTd.classList.add("tdTransactionTable");

    newTitleTd.innerHTML = transaction.title;
    newTransactionTd.innerHTML = formatCurrencyValue(transaction.value);
    newCategoryTd.innerHTML = formattedTransaction.category;
    newDateTd.innerHTML = transaction.date;
    newTimeTd.innerHTML = transaction.time;
    table.appendChild(newTr);
    newTr.appendChild(newTitleTd);
    newTr.appendChild(newTransactionTd);
    newTr.appendChild(newCategoryTd);
    newTr.appendChild(newDateTd);
    newTr.appendChild(newTimeTd);

    transaction.transactionType === "Entrada"
      ? (income += transaction.value)
      : (outcome += transaction.value);
  });
};