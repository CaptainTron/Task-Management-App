const NameSchema = require("../Schema/OperationSchema")
const statusCode = require("http-status-codes")

// Creates The Task
const Create_Task = async (req, res) => {
    try {
        const task = await NameSchema.create(req.body)
        res.status(201).json({ message: "Successfully Created!", task })
    } catch (err) {
        res.status(statusCode.NOT_ACCEPTABLE).json({ message: err })

    }
}

// Returns All the Tasks
const Get_Task = async (req, res) => {
    try {
        const { taskname, status } = req.query
        const task = await NameSchema.find().select(["-__v"])
        res.status(200).json({ task })
    } catch (err) {
        res.status(statusCode.NOT_ACCEPTABLE).json({ message: "Schema is False", error: err.message })
    }
}

// Updates The Tasks
const Patch_Task = async (req, res) => {
    try {
        const { _id } = req.query
        const task = await NameSchema.findOneAndUpdate({ _id }, req.body, {
            new: true, runValidators: true
        }).select(["-__v"])
        res.status(200).json({ task })
    } catch (err) {
        res.status(500).json({ message: "Schema is False", error: err.message })
    }
}

// Delete The selected Tasks
const Delete_Task = async (req, res) => {
    try {
        const { _id } = req.query
        const count = await NameSchema.deleteOne({ _id })
        res.status(200).json({ message: "Deletion Successful!", status: count })
    } catch (err) {
        res.status(500).json({ message: "Schema is False", error: err.message })
    }
}

module.exports = {
    Create_Task,
    Get_Task,
    Patch_Task,
    Delete_Task
}