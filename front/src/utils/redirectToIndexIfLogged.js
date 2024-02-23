  const validateUserLogged = async () => {
  const token = localStorage.getItem('@ControleFinanceiro:token');
  const user = localStorage.getItem('@ControleFinanceiro:user');

  if (!token && !user) {
    localStorage.removeItem('@ControleFinanceiro:user');
    localStorage.removeItem('@ControleFinanceiro:token');
  }

  try {
    const req = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    await req.json();

    if (req.ok) {
      console.log('teste');
      window.location.replace('/');
      return;
    } else {
      localStorage.removeItem('@ControleFinanceiro:user');
      localStorage.removeItem('@ControleFinanceiro:token');
    }
  } catch (err) {
    localStorage.removeItem('@ControleFinanceiro:user');
    localStorage.removeItem('@ControleFinanceiro:token');
  }
};

validateUserLogged();
