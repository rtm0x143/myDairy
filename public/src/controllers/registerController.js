class RegisterController {
    constructor() {
        this.view = new FormView("register_form", ["username"])
        this.view.bindSubmitHandler(this.submitHandler.bind(this))
    }

    async submitHandler({ username, email, password, password_repeat }) {
        username = username.trim()
        email = email.trim()
        password = password.trim()
        password_repeat = password_repeat.trim()
        let valid = true
        if (!Utils.verifyEmail(email)) {
            this.view.showWarning("email", "Invalid Email")
            valid = false
        }
        if (!Utils.verifyPassword(password)) {
            this.view.showWarning("password", "Invalid Password")
            valid = false
        }
        if (password !== password_repeat) {
            this.view.showWarning("password_repeat", "Password fields aren't equal")
            valid = false
        }

        if (valid) {
            const user = new User({ username, email })
            user.register(password)
                .then(result => {
                    if (result.success) {
                        localStorage.setItem("authToken", result.token)
                        window.location.href = "/client"
                    } else {
                        this.view.showWarning("email", result.error)
                    }
                }).catch(e => console.log(e))
        }
    }
}