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
