const nameInput = document.getElementsByClassName('NameInput')[0];
const emailInput = document.getElementsByClassName('EmailInput')[0];
const textareaInput = document.getElementsByClassName('TextArea')[0];

const handleClearForm = () => {
  nameInput.value = '';
  emailInput.value = '';
  textareaInput.value = '';
};

const handleSubmitForm = () => {
  fetch('http://localhost:3000/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      message: textareaInput.value,
    }),
  })
    .then((response) => {
      response.json();
    })
    .then(() => {
      toastr.success('Mensagem enviada com sucesso!');
      handleClearForm();
    });
};
