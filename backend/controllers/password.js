function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])[A-Za-z\d!@#\$%\^&\*]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error();
    }
  }
  
  module.exports = isPasswordValid;
  