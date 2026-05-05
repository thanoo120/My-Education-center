const userModel = require('../models/userModel');

const createUser = async (user, conn = null) => {
  return await userModel.createUser(user, conn);
};

const findUserByEmail = async (email) => {
  return await userModel.findUserByEmail(email);
};

module.exports = {
  createUser,
  findUserByEmail,
};
