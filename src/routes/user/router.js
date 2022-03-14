require("dotenv").config()
const { Note, Task, Record, Event, Todo} = require("../../src/models/archive")
const User = require("../../src/models/user")
const {verifyEmail, verifyPassword, checkForNecessaryFields} = require("../../src/utils")
const jws = require("jsonwebtoken")

module.exports = require("express").Router()
    .get("/", (req, res) => {
        const filter = {}
        if (req.query.id) {
            filter._id = req.query.id
        } else if (req.query.email) {
            filter.email = req.query.email
        } else {
            res.status(400).send()
            return
        }

        User.findOne(filter).then(user => {
            if (user) {
                res.contentType("application/json")
                res.json({
                    message: "user found",
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                })
            } else res.status(404).send("user not found")
        })
    })
    .post("/login", [checkForNecessaryFields(["email", "password"]), (req, res) => {
        const {email, password} = req.body
        User.findOne({email, password}).then(user => {
            if (user) {
                res.setHeader("Content-Type", "application/java")
                res.json({
                    token: jws.sign({id: user.id}, process.env.jwtKey, {expiresIn: "24h"}),
                    message: "User login done successfully"
                })
            } else {
                res.status(404).send("Incorrect pair email, password")
            }
        })
    }])
    .post("/register", [checkForNecessaryFields(["username", "email", "password"]), (req, res) => {
        User.findOne({email: req.body.email}).then(user => {
            if (user) {
                res.status(403).send("User with that email already exist")
            } else if (verifyEmail(req.body.email) && verifyPassword(req.body.password)) {
                (new User(req.body)).save().then(user => {
                    res.setHeader("Content-Type", "application/json")
                    res.json({
                        message: "User registered and logged in",
                        token: jws.sign({id: user.id}, process.env.jwtKey, {expiresIn: "24h"})
                    })
                })
            } else {
                res.status(400).send("Invalid email/password")
            }
        })
    }])

