const User = require("../models/User.js");

const create = (body) => User.create(body);

module.exports = {
    create,
};