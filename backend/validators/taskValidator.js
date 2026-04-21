const { body } = require("express-validator");

exports.taskValidation = [body("title").notEmpty()];