const jwt = require('jsonwebtoken');

const secret = 'senhasecretashiii';

const createNewTokenRegister = (id, email, displayName) => {
  const jwtConfig = {
    expiresIn: '23h',
    algorithm: 'HS256',
  };
  const token = jwt.sign(
    { data: { email, id, displayName } },
    secret,
    jwtConfig,
  );
  return token;
};

const createNewTokenLogin = (email, password, id) => {
  const jwtConfig = {
    expiresIn: '23h',
    algorithm: 'HS256',
  };
  const token = jwt.sign(
    { data: { email, password, id } },
    secret,
    jwtConfig,
  );
  return token;
};

module.exports = { createNewTokenRegister, createNewTokenLogin };
