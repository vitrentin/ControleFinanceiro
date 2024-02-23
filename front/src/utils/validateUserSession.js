const token = localStorage.getItem('@ControleFinanceiro:token');
const user = localStorage.getItem('@ControleFinanceiro:user');

if (!token && !user) {
  localStorage.removeItem('@ControleFinanceiro:user');
  localStorage.removeItem('@ControleFinanceiro:token');
  window.location.replace('/login');
}

verifyUser = async () => {
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
      localStorage.setItem('@ControleFinanceiro:user', JSON.stringify(response));

      return {
        user: JSON.parse(user),
        token,
      };
    } else {
      localStorage.removeItem('@ControleFinanceiro:user');
      localStorage.removeItem('@ControleFinanceiro:token');
      window.location.replace('/login');
    }
  } catch (err) {
    localStorage.removeItem('@ControleFinanceiro:user');
    localStorage.removeItem('@ControleFinanceiro:token');
    window.location.replace('/login');
  }
};

verifyUser();
