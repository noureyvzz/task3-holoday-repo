class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
const users = [];
function toggleForm(isLogin) {
    document.getElementById('loginForm').style.display = isLogin ? 'block' : 'none';
    document.getElementById('registerForm').style.display = isLogin ? 'none' : 'block';
    document.getElementById('loginTab').classList.toggle('active', isLogin);
    document.getElementById('registerTab').classList.toggle('active', !isLogin);
}
document.getElementById('loginTab').addEventListener('click', () => toggleForm(true));
document.getElementById('registerTab').addEventListener('click', () => toggleForm(false));
function validateEmail(email) {
    return /^[\w\.-]+@gmail\.com$/.test(email);
}
function validatePassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password);
}
document.getElementById('register').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (!validateEmail(email)) {
        alert('Email must be a valid Gmail address.');
        return;
    }
    if (!validatePassword(password)) {
        alert('Password must be at least 8 characters long and contain an uppercase letter.');
        return;
    }
    const newUser = new User(name, email, password);
    users.push(newUser);
    alert('Registration successful! Please log in.');
    document.getElementById('register').reset();
    toggleForm(true);
});
