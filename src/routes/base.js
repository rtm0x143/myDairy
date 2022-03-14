const {application} = require("express");
module.exports = require("express").Router()
    .get("/", (req, res) => {
        res.render("home", {
            title: "Home"
        })
    })
    .get("/client", (req, res) => {
        res.render("client", {
            title: "Tester" + "'s page",
            content: "{{>register_form}}"
        })
    })




