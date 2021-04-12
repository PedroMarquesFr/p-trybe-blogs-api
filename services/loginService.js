const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const errMessage = require("./errMessage");

const secret = "senhasecretashiii";

const createNewToken = (id, email, displayName) => {
  const jwtConfig = {
    expiresIn: "1h",
    algorithm: "HS256",
  };
  const token = jwt.sign(
    { data: { email, id, displayName } },
    secret,
    jwtConfig
  );
  return token;
};

const newUser = async (displayName, email, password, image) => {
  try {
    console.log("Cheguei aqui");
    const newUser = await Users.create({ displayName, email, password, image });
    const { id } = newUser.dataValues;

    const token = createNewToken(id, email, displayName);

    return { token };
  } catch (error) {
      console.error(error)
    return errMessage("Erro interno", 500);
  }
};

module.exports = { newUser };
