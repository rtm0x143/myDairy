const { Router } = require("express")
const path = require("path")
const router = Router()

router.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
        stylesheets: []
    })
})


module.exports = router


