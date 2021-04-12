const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const errMessage = require('./errMessage');

const secret = 'senhasecretashiii';

const createNewToken = (id, email, displayName) => {
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const token = jwt.sign(
    { data: { email, id, displayName } },
    secret,
    jwtConfig,
  );
  return token;
};

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
  try {
    const [user, created] = await Users.findOrCreate({
      where: { email },
      defaults: { displayName, email, password, image },
    });
    const { id } = user;

    if (!created) return errMessage('Usuário já existe', 409);

    const token = createNewToken(id, email, displayName);
    return { token };
  } catch (error) {
    console.error(error);
    return errMessage('Erro interno', 500);
  }
};

module.exports = { newUser };
