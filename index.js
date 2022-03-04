require("dotenv").config()
const express = require("express")
const { MongoClient } = require("mongodb")
const ExpressHandlebars = require("express-handlebars")
const baseRoutes = require("./routes/base")
const path = require("path")

const app = express()
const dbClient = new MongoClient(process.env.CONNECTION)
const hbs = ExpressHandlebars.create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "./views")

app.use(express.static(path.join(__dirname, 'public')))
app.use(baseRoutes)




async function start() {
    try {
        await dbClient.connect()

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server has been started on port ${process.env.PORT || 3000}...`)
        })
    }
    catch (error) {
        console.error(error.message)
    }
}
start()