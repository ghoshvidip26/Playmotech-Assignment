function validatePassword(pw) {
    if (typeof pw !== "string") {
        return false;
    }

    return (
        /[A-Z]/.test(pw) &&
        /[a-z]/.test(pw) &&
        /[0-9]/.test(pw) &&
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw) &&
        pw.length >= 8
    );
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const getErrorResponse = (error) => ({
    status: error.status || 500,
    msg: error.message || "Internal server error",
});

export { validatePassword, validateEmail, getErrorResponse };
