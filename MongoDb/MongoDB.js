const mongoose = require("mongoose")

const mongodb = (url) => {
    return mongoose
        .connect(url)
        .then((res) => console.log("Connected"))
        .catch((err) => console.log("Something Went Wrong", err.message))
}

module.exports = { mongodb }