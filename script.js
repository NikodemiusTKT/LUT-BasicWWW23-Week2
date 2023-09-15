document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  // get form elements from the DOM
  let userInput = document.getElementById('input-username');
  let emailInput = document.getElementById('input-email');
  let adminInput = document.getElementById('input-admin');
  // if either username or email inputs are empty then don't proceed
  if (userInput.value === '' || emailInput.value === '') return;
  // create one table row and three table columns
  let tableRow = document.createElement('tr');
  let tableCol1 = document.createElement('td');
  let tableCol2 = document.createElement('td');
  let tableCol3 = document.createElement('td');
  // short function to convert boolean checkbox value into 'X' if true or '-' if false
  const adminValueSetter = (checkValue) => {
    return checkValue ? 'X' : '-';
  };
  // set table column values to the ones which we get from the form elements
  tableCol1.textContent = userInput.value;
  tableCol2.textContent = emailInput.value;
  tableCol3.textContent = adminValueSetter(adminInput.checked);
  // add columns to the table row
  tableRow.appendChild(tableCol1);
  tableRow.appendChild(tableCol2);
  tableRow.appendChild(tableCol3);
  // append new table row to the table body
  document.querySelector('tbody').append(tableRow);
  // Reset form inputs
  userInput.value = '';
  emailInput.value = '';
  adminInput.checked = false;
});
