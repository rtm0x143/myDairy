const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i
const passwordRegex = /\w{6,20}/i

verifyEmail = (email) => emailRegex.test(email)
verifyPassword = (password) => passwordRegex.test(password)

module.exports = {verifyEmail, verifyPassword}