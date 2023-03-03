// Conditions : 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*])[A-Za-z\d!@#\$%\^&\*]{8,}$/; // ?=. : contient au moins un des caractères suivants
    if (!passwordRegex.test(password)) { // Si le mot de passe ne correspond pas à la regex
        throw new Error();
    }
  }
  
// Autre possibilité :

// const passwordValidator = require('password-validator');
// const passwordSchema = new passwordValidator();
//  passwordSchema
// .is().min(8)                                    
// .is().max(50)                                  
// .has().uppercase()                              
// .has().lowercase()                             
// .has().digits()                                
// .has().not().symbols();


module.exports = isPasswordValid;
  

                         