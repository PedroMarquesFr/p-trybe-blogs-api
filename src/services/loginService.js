const bcrypt = require('bcrypt-nodejs');
const { createNewTokenLogin } = require('./createNewToken');
const { Users } = require('../models');
const errMessage = require('./errMessage');

const validateCamps = (email, password) => {
  if (email === '') return errMessage('"email" is not allowed to be empty', 400);
  if (password === '') return errMessage('"password" is not allowed to be empty', 400);
  if (!email) return errMessage('"email" is required', 400);
  if (!password) return errMessage('"password" is required', 400);
  return { ok: 'ok' };
};

const newLogin = async (email, password) => {
  const isValid = validateCamps(email, password);
  if (!isValid.ok) return isValid;

  const doesUserExists = await Users.findOne({ where: { email } });
  console.log(doesUserExists);
  if (!doesUserExists) return errMessage('Campos inválidos', 400);

  const isMatch = bcrypt.compareSync(password, doesUserExists.password);
  if (!isMatch) return errMessage('Senha invalida', 401);

  const token = createNewTokenLogin(email, password, doesUserExists.dataValues.id);
  return { token };
};

module.exports = { newLogin };
