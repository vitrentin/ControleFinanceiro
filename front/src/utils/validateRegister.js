const validate = (name, email, password, password_confirmation) => {
  toastr.options.progressBar = true;
  toastr.options.closeDuration = 300;
  toastr.options.closeButton = true;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  name.classList.remove('error');
  name.nextElementSibling.classList.remove('error_text_visible');

  email.classList.remove('error');
  email.nextElementSibling.classList.remove('error_text_visible');

  password.classList.remove('error');
  password.nextElementSibling.classList.remove('error_text_visible');

  password_confirmation.classList.remove('error');
  password_confirmation.nextElementSibling.classList.remove(
    'error_text_visible'
  );

  let isValid = true;

  if (!name.value || name.value.length <= 3) {
    name.classList.add('error');
    name.nextElementSibling.innerText = '*Insira no mínimo 3 caracteres!';
    name.nextElementSibling.classList.add('error_text_visible');
    toastr.error('O campo nome está inválido', 'Dados incorretos!');
    isValid = false;
  }

  if (!email.value || !email.value.match(emailRegex)) {
    email.classList.add('error');
    email.nextElementSibling.innerText = '* Insira um e-mail válido!';
    email.nextElementSibling.classList.add('error_text_visible');
    toastr.error('O campo email está inválido', 'Dados incorretos!');
    isValid = false;
  }

  if (!password.value || password.value.length < 6) {
    password.classList.add('error');
    password.nextElementSibling.innerText = '* Insira no mínimo 6 caracteres!';
    password.nextElementSibling.classList.add('error_text_visible');
    toastr.error('O campo senha está inválido', 'Dados incorretos!');
    isValid = false;
  }

  if (
    !password_confirmation.value ||
    password_confirmation.value !== password.value
  ) {
    password_confirmation.classList.add('error');
    password_confirmation.nextElementSibling.innerText =
      '* As senhas não conferem!';
    password_confirmation.nextElementSibling.classList.add(
      'error_text_visible'
    );
    toastr.error(
      'O campo confirmação de senha está inválido',
      'Dados incorretos!'
    );
    isValid = false;
  }

  return isValid;
};

export default validate;
