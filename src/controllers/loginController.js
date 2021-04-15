const loginService = require('../services/loginService');

const newLogin = async (req, res) => {
  const { email, password } = req.body;
  const tokenOrError = await loginService.newLogin(email, password);
  res.status(tokenOrError.message ? tokenOrError.code : 200).json(tokenOrError);
};

module.exports = { newLogin };
