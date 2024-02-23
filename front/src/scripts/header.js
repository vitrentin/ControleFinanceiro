const userData = localStorage.getItem('@ControleFinanceiro:user');

const button = document.getElementById('profile');
const newP = document.createElement('p');
const newImage = document.createElement('img');

newP.setAttribute('id', 'username');
newImage.setAttribute('id', 'profilemImage');

if (userData) {
  const userdata  = JSON.parse(userData);
  const name = userdata.name
  console.log(userData)
  newP.innerText = name;

  button.addEventListener('click', () => {
    window.location.replace('/profile');
  });

  loadImageUser = async () => {
    try {
      newImage.src = `https://ui-avatars.com/api/?name=${name}`;
      button.appendChild(newP);
      button.appendChild(newImage);
      return;
    } catch (err) {
      console.log(err);
      console.log('Error with avatar API');
    }
  };

  loadImageUser();
} else {
  button.innerHTML = '';
}
