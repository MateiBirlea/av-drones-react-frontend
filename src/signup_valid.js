function validation(first_name, last_name, email, password) {
    let error = {};
    
    
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


 
 if (!email_pattern.test(email)) {
        error.email = "Please enter a valid email address (e.g., example@domain.com).";
    } 

    
 if (!password_pattern.test(password)) {
        error.password = "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one digit.";
    } 

    
    if (first_name === "") {
        error.first_name = "First name should not be empty.";
    }

   
    if (last_name === "") {
        error.last_name = "Last name should not be empty.";
    }

    return error;
}

export default validation;
