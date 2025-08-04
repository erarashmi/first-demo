const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateUI() {
  list.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.title} - ₹${expense.amount} [${expense.category}]
      <button onclick="deleteExpense(${index})">X</button>
    `;
    list.appendChild(li);
    total += Number(expense.amount);
  });

  totalDisplay.innerText = `Total: ₹${total}`;
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;

  expenses.push({ title, amount, category });
  updateUI();
  form.reset();
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}

// Initial Load
updateUI();
