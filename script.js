let userMatrixArray = [
  ['Webmaster', 'webmaster@email.com', 'X', ''],
  ['User123', 'user123@email.com', '-', ''],
  ['AnotherUser123', 'anotheruser123@email.com', '-', ''],
];
// helper function to replace the DOM table with the userMatrixArray
const replaceHtmlTableWithMatrix = () => {
  document
    .querySelector('tbody')
    .replaceWith(HTMLTableFrom2dArray(userMatrixArray));
};

// initializer function when window loads
window.onload = function () {
  // construct DOM table from the 2D matrix data
  replaceHtmlTableWithMatrix();
  // bind submit event function to the form
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    submitFormData();
  });
  // bind empty table function to the button
  document.querySelector('#empty-table').addEventListener('click', (e) => {
    emptyTable();
  });
};

// helper function to convert Admin checkbox value into 'X' if true or '-' if false
const adminStringSetter = (isAdmin) => {
  return isAdmin ? 'X' : '-';
};
function submitFormData() {
  let form = document.querySelector('form');
  const { username, email, admin, image } = getFormInputs(form);
  // if either username or email inputs are empty then don't proceed
  if (username === '' || email === '') return;
  let userIndex = indexOfUser(username, userMatrixArray);
  const imageBlob = URL.createObjectURL(image);
  // if username already exist then change existing values at the table
  if (userIndex >= 0) {
    changeExistingUser(userIndex, {
      username,
      email,
      isAdmin: admin,
      imageBlob,
    });
    return;
  }
  userMatrixArray.push([username, email, adminStringSetter(admin), imageBlob]);
  // construct new HTML table from the newly change data matrix array
  replaceHtmlTableWithMatrix();
}
// function to clear form element values
function clearFormElements() {
  // get form elements from the DOM
  let userInput = document.getElementById('input-username');
  let emailInput = document.getElementById('input-email');
  let adminInput = document.getElementById('input-admin');
  // Reset form inputs
  userInput.value = '';
  emailInput.value = '';
  adminInput.checked = false;
}
// helper function to iterate over and return all of the formdata key and values
function getFormInputs(form) {
  let formData = new FormData(form);
  let formKeyValues = {};
  for (const [key, value] of formData) {
    formKeyValues[key] = value;
  }
  return formKeyValues;
}
// function to change existing user at the user data matrix and then replace dom with the new table
function changeExistingUser(
  userIndex,
  { username, email, isAdmin: admin, imageBlob }
) {
  userMatrixArray[userIndex][0] = username;
  userMatrixArray[userIndex][1] = email;
  userMatrixArray[userIndex][2] = adminStringSetter(admin);
  userMatrixArray[userIndex][3] = imageBlob;
  replaceHtmlTableWithMatrix();
}

// simple function to just empty data matrix and then dom table
function emptyTable() {
  userMatrixArray = [];
  replaceHtmlTableWithMatrix();
}

// function to create DOM represantive table from the 2 dimensinal user data matrix array
function HTMLTableFrom2dArray(dataArray) {
  let tableBody = document.createElement('tbody');
  for (let i = 0; i < dataArray.length; i++) {
    let dataRow = dataArray[i];
    let tableRow = document.createElement('tr');
    for (let j = 0; j < dataRow.length; j++) {
      let tableCol1 = document.createElement('td');
      // if we are on the 4th column we know that we need to create a img element
      if (j === 3 && dataArray[i][j] !== '') {
        let imgElem = document.createElement('img');
        // set img elements max dimensions to 64x64 px
        imgElem.setAttribute('width', 64);
        imgElem.setAttribute('height', 64);
        // we get the image src from the dataMatrixArray
        imgElem.src = dataArray[i][j];
        // append the img element to the table column
        tableCol1.appendChild(imgElem);
      } else {
        tableCol1.textContent = dataArray[i][j];
      }
      tableRow.appendChild(tableCol1);
      tableBody.appendChild(tableRow);
    }
  }
  return tableBody;
}
// helper function to find the index of the user inside the 2D data matrix array
function indexOfUser(user, matrix) {
  for (var i = 0, len = matrix.length; i < len; i++) {
    for (var j = 0, len2 = matrix[i].length; j < len2; j++) {
      if (matrix[i][j] === user) {
        return i;
      }
    }
  }
  return -1;
}
