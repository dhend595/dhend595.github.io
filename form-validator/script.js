const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const verifypassword = document.getElementById('verify-email');

//function for error message
function showError(input, message){
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//function for success
function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//valid email check
function checkValidEmail(input){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())){
    showSuccess(input);
  }else{
    showError(input, 'Email is not valid')
  }
}

//check fields
function checkRequired(inputArr){
inputArr.forEach(function(input){
if (input.value.trim() === ''){
  showError(input, `${getFieldName(input)} can not be blank`);
}else{
  showSuccess(input);
}
});
}

//check input lengths for username and password
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError
    (
      input, 
      `${getFieldName(input)} must be at least ${min} characters`
      );
  }else if (input.value.length > max){
    showError
    (
      input 
      `${getFieldName(input)} exceeds ${max} characters`);
  }else{
    showSuccess(input);
  }
}

//verify matching password
function checkPasswordsSame(input1, input2) {
  if(input1.value === input2.value){
    showSuccess(input2);
  } else{
    showError(input2, 'Passwords do not match')
  }
}


//upper case show error for blank fields
function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

checkRequired([username, email, password, password2]);
checkLength(username, 3, 16);
checkLength(password, 5, 19);
checkValidEmail(email);
checkPasswordsSame(password, password2)
});