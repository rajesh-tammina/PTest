System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var messages;
    return {
        setters:[],
        execute: function() {
            exports_1("messages", messages = {
                "lname_req": "Last Name is required.",
                "lname_invalid": "Enter valid last name.",
                "lname_len_exceeded": "Last name should not be more than 50 characters.",
                "fname_req": "First Name is required.",
                "fname_invalid": "Enter valid first name.",
                "fname_len_exceeded": "First name should not be more than 50 characters.",
                "mname_invalid": "Enter valid middle name.",
                "mname_len_exceeded": "Middle name should not be more than 50 characters.",
                "email_invalid": "Email format is invalid.",
                "email_len_exceeded": "Email should not be more than 50 characters.",
                "gradyr_req": "Grad Year is required.",
                "script_tags_error": "Please enter valid text,no scripts are allowed.",
                "usernotes_limit": "User notes should not be more than 7500 characters.",
                "testname_limit": "Test name should not be more than 100 characters.",
                "score_limit": "Score should not be more than 100 characters.",
                "comment_limit": "Comment should not be more than 500 characters.",
                "session_expire_msg": "Your session will be expired in 2 minutes.Click yes to extend",
                "data_empty": "You do not have any data.",
                "username_req": "Username is required.",
                "password_req": "Password is required.",
                "invalid_credentials": "Invalid Credentials.",
                "numeral_req": "Only numerals required and must be of 4 digit",
                "email_req": "Email is required",
                "new_pass_reg": "New Password is required",
                "confirm_pass_reg": "Confirm Password is required",
                "password_strength": "Password must be at least 8 characters," +
                    "and contain at least one uppercase letter,one lowercase letter," +
                    "and one number.Password cannot contain spaces,apostrophes,or quotes."
            });
        }
    }
});
//# sourceMappingURL=messages.js.map