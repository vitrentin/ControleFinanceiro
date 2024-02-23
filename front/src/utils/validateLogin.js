const validate = (email, password) => {
  toastr.options.progressBar = true;
  toastr.options.closeDuration = 300;
  toastr.options.closeButton = true;

  email.classList.remove('error');
  email.nextElementSibling.classList.remove('error_text_visible');

  password.classList.remove('error');
  password.nextElementSibling.classList.remove('error_text_visible');

  let isValid = true;

  if (!email.value) {
    email.classList.add('error');
    email.nextElementSibling.innerText = '* O campo email é obrigatório!';
    email.nextElementSibling.classList.add('error_text_visible');
    toastr.error('O campo email é obrigatório!', 'Dados incorretos!');
    isValid = false;
  }

  if (!password.value) {
    password.classList.add('error');
    password.nextElementSibling.innerText = '* O campo senha é obrigatório!';
    password.nextElementSibling.classList.add('error_text_visible');
    toastr.error('O campo senha é obrigatório!', 'Dados incorretos!');
    isValid = false;
  }

  return isValid;
};

export default validate;
