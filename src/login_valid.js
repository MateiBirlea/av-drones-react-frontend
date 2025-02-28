function validation(email, password) {
    let error = {};

    // Validare pentru email
    if (email === "") {
        error.email = "Name should not be empty";
    }

    // Validare pentru parolă
    if (password === "") {
        error.password = "Password should not be empty";
    }

    // Dacă nu există erori pentru un câmp, nu îl mai adăugăm în obiectul error
    return error;
}

export default validation;
