const fs = require('fs');
const path = require('path');

const contextPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\context', 'AuthContext.jsx');
let content = fs.readFileSync(contextPath, 'utf8');

const oldRegister = `  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('token', response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data.user;
  };`;

const newRegister = `  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    // We intentionally DO NOT save the token or set the user here.
    // The user must verify their email before they can log in.
    return response.data.user;
  };`;

if (content.includes(oldRegister)) {
  content = content.replace(oldRegister, newRegister);
  fs.writeFileSync(contextPath, content);
  console.log("Patched AuthContext.jsx to prevent auto-login");
} else {
  console.log("Could not find register block in AuthContext.jsx");
}
