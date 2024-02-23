const storagedUser = localStorage.getItem('@ControleFinanceiro:user');
const storagedToken = localStorage.getItem('@ControleFinanceiro:token');

const nameInput = document.getElementsByClassName('NameInput')[0];
const emailInput = document.getElementsByClassName('EmailInput')[0];

if (storagedUser && storagedToken) {
  nameInput.value = JSON.parse(storagedUser).name;
  emailInput.value = JSON.parse(storagedUser).email;
}


import validate from '../utils/validateProfile.js';

toastr.options.progressBar = true;
toastr.options.closeDuration = 300;
toastr.options.closeButton = true;


const user = {};

document
  .querySelectorAll('#user-form [name]')
  .forEach((input) => (user[input.name] = input));

const { name, email, old_password, password, password_confirmation } = user;

try {
  const req = await fetch('http://localhost:3000/users', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await req.json();

  if (req.ok) {
    name.value = response.name;
    email.value = response.email;
  }
} catch (err) {
  toastr.error('Tente novamente mais tarde.', 'Problemas ao carregar perfil!');

}

const updateUser = async (event) => {
  event.preventDefault();

  if (!validate(name, email, old_password, password, password_confirmation)) {
    return;
  }

  try {
    if (password.value.length > 0) {
      const req = await fetch('http://localhost:3000/users', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          old_password: old_password.value,
          password: password.value,
          password_confirmation: password_confirmation.value,
        }),
      });

      const response = await req.json();

      if (req.ok) {
        location.replace("/")
      } else {
        toastr.error(`${response.message}`, 'Erro ao atualizar usuário!');
        password.value = '';
        old_password.value = '';
        password_confirmation.value = '';
      }
    } else {
      const req = await fetch('http://localhost:3000/users', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
        }),
      });

      const response = await req.json();

      if (req.ok) {
        location.replace("/")
      } else {
        toastr.error(`${response.message}`, 'Erro ao atualizar usuário!');
      }
    }
  } catch (err) {
    toastr.error('Tente novamente mais tarde!', 'Erro ao cadastrar usuário!');
    console.error(`error: ${err}`);
  }
};

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', updateUser);
