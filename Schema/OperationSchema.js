const mongoose = require("mongoose")


const CRUD = new mongoose.Schema({
    taskname: {
        type: String,
        required: [true, "Task Name is Must"],
        maxlength: 50,
        minlength: 1,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Description is Must"],
        maxlength: 100
    },
    status: {
        type: String,
        required: [true, "Status is Must"],
        enum: { values: ["Completed", "Pending"], message: '{VALUE} is not valid Option, it must be either Completed or Pending' }
    },
})

CRUD.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(`Task Name Must Be Unique`,);
    }
    else if (error.name === 'ValidationError') {
        if (error.errors.taskname) next(error.errors.taskname.message);
        else if (error.errors.status) next(error.errors.status.message)
        else if (error.errors.description) next(error.errors.description.message)
        else next("Wrong Schema !");
    }
    else {
        next();
    }
});

module.exports = mongoose.model("Test", CRUD)