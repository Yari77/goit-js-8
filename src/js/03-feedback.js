import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = form.querySelector("input[name='email']");
const textarea = form.querySelector("textarea[name='message']");

const saveFormData = JSON.parse(localStorage.getItem('feedback-form-state'));
if (saveFormData !== null) {
  const { email, message } = saveFormData;
  input.value = email;
  textarea.value = message;
}

form.addEventListener(
  'input',
  throttle(function () {
    const email = form.querySelector("[name='email']").value;
    const message = form.querySelector("[name='message']").value;
    const info = { email, message };
    localStorage.setItem('feedback-form-state', JSON.stringify(info));
  }, 500)
);

form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (input.value === '' || textarea.value === '') {
    alert('All fields are required');
  } else {
    const storage = localStorage.getItem('feedback-form-state');
    console.log(JSON.parse(storage));
    localStorage.removeItem('feedback-form-state');
    input.value = '';
    textarea.value = '';
  }
});
