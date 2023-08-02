const express = require("express")
const router = express.Router()

const { Create_Task, Delete_Task, Get_Task, Patch_Task } = require("../models/models.js")

router.route("/")
    .post(Create_Task)
    .delete(Delete_Task)
    .get(Get_Task)
    .patch(Patch_Task)

module.exports = router