const validators = {
  notNull: (element) => element.value.trim() !== "",
  minLength: (element) => element.value.length >= 5,
  maxLength: (element) => element.value.length <= 10,
  alphaNumeric: (element) =>
    /[!@#$%^&*()_+{}\[\]:;<>,.?\\|`~\-="']/g.test(element.value) == false,
};

const d = new Map([
  ["Tea", ["Masala Tea"]],
  ["Coffee", ["Cold Coffee"]],
  ["Milkshake", ["Banana"]],
  ["Water", ["Kinley"]],
  ["Lemonade", ["Pink Lemonade"]],
]);

var firstnameValid;
var lastnameValid;
var emailValid;
var phNoValid;
var stAddValid;
var stateValid;
var cityValid;
var zipcodeValid;
var isGenderMarked = false;
var isSelected = false;
var isSourceMaked = false;
var cmtValid = false;
var prefValid = true;

function validateField(fieldName) {
  const field = document.getElementById(fieldName);
  let valid = true;
  for (var i in validators) {
    const validator = validators[i];
    if (!validator(field)) {
      switch (i) {
        case "notNull":
          valid = false;
          showError(field, `This field cannot be empty`);
          break;
        case "minLength":
          valid = false;
          showError(field, `This field should be at least 5 characters long.`);
          break;
        case "maxLength":
          valid = false;
          showError(field, `This field cannot be longer than 10 characters.`);
          break;
        case "alphaNumeric":
          valid = false;
          showError(
            field,
            `This field should contain only alphanumeric characters.`
          );
          break;
      }
    }
  }
  if (valid) {
    showSuccess(field);
  }
  return valid;
}

function showError(field, message) {
  var existingError = field.nextElementSibling;
  if (existingError && existingError.classList.contains("error")) {
    existingError.innerHTML = message;
  } else {
    var error = document.createElement("p");
    error.innerHTML = message;
    error.className = "error";
    error.style.color = "red";
    field.parentNode.insertBefore(error, field.nextSibling);
  }
}

function showSuccess(field) {
  var errors = document.getElementsByClassName("error");
  console.log(errors);
  for (var i = 0; i < errors.length; i++) {
    field.parentNode.removeChild(errors[i]);
  }
}

function validateFirstName() {
  firstnameValid = validateField("firstName");
}

function validateLastName() {
  lastnameValid = validateField("lastName");
  console.log(lastnameValid);
}

function validateEmail() {
  var email = document.getElementById("emailId");
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var ans = emailRegex.test(email.value);
  if (email.value === "") {
    showError(email, "Email cannot be empty.");
    emailValid = false;
  }

  if (ans == true) {
    var emailSplit = email.value.split("@");
    var domain = emailSplit[1];
    if (domain != "northeastern.edu") {
      showError(email, "Incorrect domain name.");
      emailValid = false;
    } else {
      showSuccess(email);
      emailValid = true;
    }
  } else {
    showError(email, "Incorrect email address.");
    emailValid = false;
  }
}

function validateZipCode() {
  var zipcode = document.getElementById("zipcode");
  const zipcodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
  var ans = zipcodeRegex.test(zipcode.value);
  if (zipcode.value === "") {
    showError(zipcode, "ZipCode cannot be empty.");
    zipcodeValid = false;
  }

  if (ans == true) {
    showSuccess(zipcode);
    zipcodeValid = true;
  } else {
    showError(zipcode, "Incorrect ZipCode.");
    zipcodeValid = false;
  }
}

function validatePhoneNumber() {
  var phNo = document.getElementById("phoneNumber");
  const phNoRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  var ans = phNoRegex.test(phNo.value);
  if (phNo.value === "") {
    showError(phNo, "Phone Number cannot be empty.");
    phNoValid = false;
  }
  if (ans == true) {
    showSuccess(phNo);
    phNoValid = true;
  } else {
    showError(phNo, "Invalid Phone Number.");
    phNoValid = false;
  }
}

function validateAddress() {
  stAddValid = validateField("streetAdress1");
}

function validateState() {
  stateValid = validateField("state");
}

function validateCity() {
  cityValid = validateField("city");
}

function validate(event) {
  const submitButton = document.getElementById("btn");

  if (event.target.type === "radio" && event.target.name === "title") {
    if (event.target.checked == true) {
      isGenderMarked = true;
    }
  }
  console.log(isGenderMarked);

  console.log(event.target.name);
  console.log(event.target.type);
  if (event.target.type === "select-one" && event.target.name === "dropdown") {
    console.log(event.target.value);
    if (event.target.value != "") {
      isSelected = true;
    }
  }
  console.log(isSelected);

  if (event.target.type === "checkbox" && event.target.name === "source") {
    var sourceElements = document.querySelectorAll(
      'input[name="source"]:checked'
    );
    if(sourceElements.length!=0){
      isSourceMaked = true;
    }
    else{
      isSourceMaked = false;
    }
  }
  console.log(isSourceMaked);

  console.log(document.getElementById("preferences"));
  console.log(event.target.type);
  console.log(event.target.name);

    const isPreferencesChecked = document.querySelectorAll(
      'input[name="choice"]:checked'
    ); 

    let checkedValue;

isPreferencesChecked.forEach((x) => {
  checkedValue = x.value;
});

console.log(checkedValue);

let foundKey;

for (const [key, values] of d) {
  if (values.includes(checkedValue)) {
    foundKey = key;
    break; 
  }
}

    console.log(isPreferencesChecked)
    var selectEle = document.getElementById("dropdown");
    var selectedValue = selectEle.options[selectEle.selectedIndex].text;
    console.log(isPreferencesChecked.length)
    if (foundKey==selectedValue) {
      console.log(document.getElementById("preferences").value)
      console.log('hhiihih')
      prefValid = false;
      const preferencesField = document.getElementById("preferences");
      if(document.getElementById("preferences").value != ""){
        prefValid = true;
      }
      if (event.target.type === "text" && event.target.name === "preferences") {
        if (event.target.value === "") {
          showError(preferencesField, "Preferences is required.");
          console.log(event.target.value)
          prefValid = false;
        } else {
          showSuccess(preferencesField);
          prefValid = true;
        }
      }
    } else {
      prefValid = true;
    }
    
  console.log(prefValid);

  if (event.target.type == "textarea" && event.target.name == "text") {
    if (event.target.value == "") {
      showError(event.target, "Enter your comments.");
      cmtValid = false;
    } else {
      cmtValid = true;
      showSuccess(event.target);
    }
  }

  console.log(
    firstnameValid,
    lastnameValid,
    emailValid,
    phNoValid,
    stAddValid,
    stateValid,
    cityValid,
    zipcodeValid,
    isGenderMarked,
    isSelected,
    cmtValid,
    prefValid,
    isSourceMaked
  );

  if (
    firstnameValid &&
    lastnameValid &&
    emailValid &&
    phNoValid &&
    stAddValid &&
    stateValid &&
    cityValid &&
    zipcodeValid &&
    isGenderMarked &&
    isSelected &&
    cmtValid &&
    prefValid &&
    isSourceMaked
  ) {
    submitButton.disabled = false;
    var form = document.getElementById("myForm");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission behavior

      var title = document.querySelector('input[name="title"]:checked').value;
      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var emailId = document.getElementById("emailId").value;
      var phNo = document.getElementById("phoneNumber").value;
      var streetAddress1 = document.getElementById("streetAdress1").value;
      var streetAddress2 = document.getElementById("streetAdress2").value;
      var state = document.getElementById("state").value;
      var city = document.getElementById("city").value;
      var zipcode = document.getElementById("zipcode").value;
      var selectEle = document.getElementById("dropdown");
      var selectedValue = selectEle.options[selectEle.selectedIndex].text;
      var pref =
        document.getElementById("preferences") == null
          ? ""
          : document.getElementById("preferences").value;
      var selectedSource = [];
      var sourceElements = document.querySelectorAll(
        'input[name="source"]:checked'
      );
      sourceElements.forEach(function (sourceElement) {
        selectedSource.push(sourceElement.value);
      });
      
      var selectedChoice = [];
      var choiceElements = document.querySelectorAll(
        'input[name="choice"]:checked'
      );
      choiceElements.forEach(function (choiceElement) {
        selectedChoice.push(choiceElement.value);
      });

      var cmt = document.getElementById("comments").value;

      console.log(document.getElementById('dropdown').nextElementSibling)

var data = {
  title: title,
  firstName: firstName,
  lastName: lastName,
  emailId: emailId,
  phNo: phNo,
  streetAddress1: streetAddress1,
  streetAddress2: streetAddress2,
  state: state,
  city: city,
  zipcode: zipcode,
  selectedValue: selectedValue,
  selectedChoice: selectedChoice.join(', '),
  pref: pref,
  selectedSource: selectedSource.join(', '),
  cmt: cmt
};

console.log(data);

var dataTable = document.getElementById('dataTable');
var newRow = dataTable.insertRow(-1); 


var columns = [
  'title', 'firstName', 'lastName', 'emailId', 'phNo',
  'streetAddress1','streetAddress2','state', 'city', 'zipcode',
  'selectedValue','selectedChoice', 'pref', 'selectedSource', 'cmt'
];


for (var i = 0; i < columns.length; i++) {
  var column = columns[i];
  var cell = newRow.insertCell(i);
  cell.textContent = data[column];
}

dataTable.style.display ='block';

firstnameValid = false;
lastnameValid = false;
emailValid = false;
phNoValid = false;
stAddValid = false;
stateValid = false;
cityValid = false;
zipcodeValid = false;
isGenderMarked = false;
isSelected = false;
cmtValid = false;
prefValid = false;

form.reset();
const select = document.getElementById("dropdown");
onChangeOption("default", select);
submitButton.disabled = true;

      
    });
  } else {
    submitButton.disabled = true;
  }
}

this.init = function () {
  const submitButton = document.getElementById("btn");
  submitButton.disabled = true;
  console.log(submitButton);

  var label = document.createElement("label");
  label.innerHTML = "Select an Option*:";
  label.setAttribute("for", "dropdown");

  var select = document.createElement("select");
  select.name = "dropdown";
  select.id = "dropdown";
  select.required = true;

  var options = ["Tea", "Coffee", "Milkshake", "Water", "Lemonade"];
  var disabledoption = document.createElement("option");
  disabledoption.disabled = true;
  disabledoption.selected = true;
  disabledoption.value = "";
  disabledoption.textContent = "-- select an option --";
  select.appendChild(disabledoption);

  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i];
    option.textContent = options[i];
    select.appendChild(option);
  }

  var zipcodeInput = document.getElementById("zipcode");

  var dropdownContainer = document.createElement("div");
  dropdownContainer.appendChild(label);
  dropdownContainer.appendChild(select);

  zipcodeInput.parentNode.insertBefore(
    dropdownContainer,
    zipcodeInput.nextSibling
  );

  document
    .getElementById("zipcode")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("zipcode").nextSibling
    );
  document
    .getElementById("zipcode")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("zipcode").nextSibling
    );

  document.getElementById("dropdown").addEventListener("change", function () {
    var selectedOption = this.value;
    onChangeOption(selectedOption, select);
  });

  var add1Container = document.createElement("div");
  var streetAdress1 = document.createElement("input");
  streetAdress1.id = "streetAdress1";
  var Add1label = document.createElement("label");
  Add1label.innerHTML = "Street address 1*:";
  Add1label.setAttribute("for", "add1");
  add1Container.appendChild(Add1label);
  add1Container.appendChild(streetAdress1);
  document
    .getElementById("phoneNumber")
    .parentNode.insertBefore(
      add1Container,
      document.getElementById("phoneNumber").nextSibling
    );
  document
    .getElementById("phoneNumber")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("phoneNumber").nextSibling
    );
  document
    .getElementById("phoneNumber")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("phoneNumber").nextSibling
    );
  streetAdress1.addEventListener("input", validateAddress);

  var add2Container = document.createElement("div");
  var streetAdress2 = document.createElement("input");
  var Add2label = document.createElement("label");
  streetAdress2.id = "streetAdress2";
  Add2label.innerHTML = "Street address 2:";
  Add2label.setAttribute("for", "add2");
  add2Container.appendChild(Add2label);
  add2Container.appendChild(streetAdress2);
  document
    .getElementById("streetAdress1")
    .parentNode.insertBefore(
      add2Container,
      document.getElementById("streetAdress1").nextSibling
    );
  document
    .getElementById("streetAdress1")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("streetAdress1").nextSibling
    );
  document
    .getElementById("streetAdress1")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("streetAdress1").nextSibling
    );

  var stateContainer = document.createElement("div");
  var state = document.createElement("input");
  var statelabel = document.createElement("label");
  statelabel.innerHTML = "State *:";
  state.id = "state";
  statelabel.setAttribute("for", "state");
  stateContainer.appendChild(statelabel);
  stateContainer.appendChild(state);
  document
    .getElementById("streetAdress2")
    .parentNode.insertBefore(
      stateContainer,
      document.getElementById("streetAdress2").nextSibling
    );
  document
    .getElementById("streetAdress2")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("streetAdress2").nextSibling
    );
  document
    .getElementById("streetAdress2")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("streetAdress2").nextSibling
    );
  state.addEventListener("input", validateState);

  var cityContainer = document.createElement("div");
  var city = document.createElement("input");
  var citylabel = document.createElement("label");
  citylabel.innerHTML = "City *:";
  city.id = "city";
  citylabel.setAttribute("for", "city");
  cityContainer.appendChild(citylabel);
  cityContainer.appendChild(city);
  document
    .getElementById("state")
    .parentNode.insertBefore(
      cityContainer,
      document.getElementById("state").nextSibling
    );
  document
    .getElementById("state")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("state").nextSibling
    );
  document
    .getElementById("state")
    .parentNode.insertBefore(
      document.createElement("br"),
      document.getElementById("state").nextSibling
    );
  city.addEventListener("input", validateCity);

  var dataTable = document.createElement("table");
  dataTable.id = "dataTable";
  dataTable.setAttribute("border", "1");

  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = [
    "Title",
    "First Name",
    "Last Name",
    "Email",
    "Phone Number",
    "Street Address",
    "Street Address 2",
    "State",
    "City",
    "Zipcode",
    "Selected Option",
    " Choice",
    "Preferences",
    "Selected Source",
    "Comments",
  ];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  dataTable.appendChild(thead);

  var tbody = document.createElement("tbody");
  tbody.id = "tbody";
  dataTable.appendChild(tbody);

  document.body.appendChild(dataTable);

  dataTable.style.display = "none";
};

function onChangeOption(selectedOption, select) {
  const checkboxContainers = document.querySelectorAll(".checkbox-container");
  checkboxContainers.forEach((container) => container.remove());

  if (d.has(selectedOption)) {
    const choices = d.get(selectedOption);

    for (let i = 0; i < choices.length; i++) {
      const checkbox = document.createElement("input");
      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "checkbox-container";
      const brElement = document.createElement("br");
      const label = document.createElement("label");

      label.innerHTML = choices[i];
      checkbox.type = "checkbox";
      checkbox.id = choices[i];
      checkbox.name = "choice";
      checkbox.value = choices[i];

      checkbox.addEventListener("click", function () {
        if (checkbox.checked) {
          const prefContainer = document.createElement("div");
          const txtField = document.createElement("input");
          const brElement = document.createElement("br");
          const label = document.createElement("label");
          label.innerHTML = "Any preferences *";

          txtField.setAttribute("required", "true");

          txtField.type = "text";
          txtField.id = "preferences";
          txtField.name = "preferences";

          prefContainer.appendChild(brElement);
          prefContainer.appendChild(label);
          prefContainer.appendChild(txtField);

          checkboxContainer.appendChild(prefContainer);
        } else {
          const prefContainer = checkboxContainer.querySelector("div");
          console.log(prefContainer);
          if (prefContainer) {
            prefContainer.innerHTML = "";
            prefContainer.remove();
          }
          console.log(prefContainer);
        }
      });

      checkboxContainer.appendChild(brElement);
      checkboxContainer.appendChild(label);
      checkboxContainer.appendChild(checkbox);

      select.parentNode.insertBefore(checkboxContainer, select.nextSibling);
    }
  }
  else {
    select.selectedIndex = 0;
  }
}

window.addEventListener("load", init);

document.myForm.addEventListener("input", function (event) {
  validate(event);
});
