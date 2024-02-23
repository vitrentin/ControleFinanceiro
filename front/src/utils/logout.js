const logout = () => {
  localStorage.removeItem('@ControleFinanceiro:user');
  localStorage.removeItem('@ControleFinanceiro:token');

  window.location.replace('/login');
};
