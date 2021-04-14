const userService = require('../services/userService');

const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const tokenOrError = await userService.newUser(
    displayName,
    email,
    password,
    image,
  );
  res.status(tokenOrError.message ? tokenOrError.code : 201).json(tokenOrError);
};

const listUser = async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
};

const listSingleUser = async (req, res) => {
  const { id } = req.params;
  const userOrError = await userService.getSingleUser(id);
  res.status(userOrError.message ? userOrError.code : 200).json(userOrError);
};

const deleteUser = async (req, res) => {
  const { email, password } = req.user;
  const isDeleted = await userService.deleteUser(email, password);

  res.status(isDeleted.message ? isDeleted.code : 204).json(isDeleted);
};

module.exports = { newUser, listUser, listSingleUser, deleteUser };
