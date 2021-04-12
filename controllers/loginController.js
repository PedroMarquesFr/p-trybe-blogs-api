const loginService = require("../services/loginService");

const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const tokenOrError = await loginService.newUser(
    displayName,
    email,
    password,
    image
  );
  console.log(tokenOrError);
  res.status(tokenOrError.message ? tokenOrError.code : 201).json(tokenOrError);
};

module.exports = { newUser };
