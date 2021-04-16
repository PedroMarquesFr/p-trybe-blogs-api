const bcrypt = require('bcrypt-nodejs');
const { Users } = require('../models');

const errMessage = require('./errMessage');
const { createNewTokenRegister } = require('./createNewToken');

const validateCamps = (displayName, email, password) => {
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email) return errMessage('"email" is required', 400);
  if (!password) return errMessage('"password" is required', 400);

  if (displayName.length < 8) return errMessage('"displayName" length must be at least 8 characters long', 400);
  if (!EMAIL_REGEX.test(email)) return errMessage('"email" must be a valid email', 400);
  if (password.length < 6) return errMessage('"password" length must be 6 characters long', 400);

  return { ok: 'ok' };
};

const newUser = async (displayName, email, password, image) => {
  const isValid = validateCamps(displayName, email, password);
  if (!isValid.ok) return isValid;

  const salt = bcrypt.genSaltSync(5);
  password = bcrypt.hashSync(password, salt);
  try {
    const [user, created] = await Users.findOrCreate({
      where: { email },
      defaults: { displayName, email, password, image },
    });
    const { id } = user;

    if (!created) return errMessage('Usuário já existe', 409);

    const token = createNewTokenRegister(id, email, displayName);
    return { token };
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

const checkUserByEmail = async (email) => {
  if (!email) return errMessage('Email nao enviado', 404);
  try {
    const user = Users.findOne({ where: { email } });
    console.log(user);
    if (!user) return errMessage('usuario nao encontrado', 404);
    return { user };
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

const getUsers = async () => {
  try {
    const users = Users.findAll();
    return users;
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

const getSingleUser = async (id) => {
  try {
    const user = await Users.findByPk(id);
    if (!user) return errMessage('Usuário não existe', 404);
    return user;
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

const deleteUser = async (email, password) => {
  if (!email) return errMessage('"email" is required', 400);
  if (!password) return errMessage('"password" is required', 400);
  try {
    const deleted = await Users.destroy({
      where: {
        email,
      },
    });
    console.log(deleted);
    return { ok: 'ok' };
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

module.exports = { newUser, checkUserByEmail, getUsers, getSingleUser, deleteUser };
