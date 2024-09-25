const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const toggleText = document.getElementById('toggle-text');
const toggleLink = document.getElementById('toggle-link');

let isLogin = true;

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? 'Login' : 'Sign Up';
  toggleText.textContent = isLogin ? "Don't have an account?" : 'Already have an account?';
  toggleLink.textContent = isLogin ? 'Sign up here' : 'Login here';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const endpoint = isLogin ? 'http://127.0.0.1:5000/login' : 'http://127.0.0.1:5000/signup';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  alert(data.message);
  if (data.success) {
    window.location.href = 'index.html'; // Redirect to index.html on success
  }
});
