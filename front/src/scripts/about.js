const storagedUser = localStorage.getItem('ControleFinanceiro:user');
const storagedToken = localStorage.getItem('ControleFinanceiro:token');
const user = JSON.parse(storagedUser);

if (user && storagedToken) {
  const button = document.getElementsByClassName('Logout')[0];

  button.innerHTML = 'Logout';
  button.onclick = () => {
    localStorage.removeItem('ControleFinanceiro:user');
    localStorage.removeItem('ControleFinanceiro:token');

    window.location.replace('/login');
  };
}
