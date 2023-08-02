const express = require("express")
const app = express()
require("dotenv").config()
app.use(express.json())

const SchemaRouter = require("./Router/Router")
app.use('/task', SchemaRouter)

const { mongodb } = require("./MongoDb/MongoDB")
const PORT = process.env.PORT || 5000

async function GetConnect() {
    try {
        await mongodb(process.env.MONGODB)
        app.listen(PORT, () => { console.log(`Server is Listening to ${PORT}....`) })
    } catch (err) {
        console.log("Something Went Wrong", err)
    }
}
GetConnect()