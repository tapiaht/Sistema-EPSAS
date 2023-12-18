import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../auth/sign.js";
import getUserInfo from "../lib/getUserInfo.js";
import sequelize from "../utils/db.js";
import { DataTypes } from 'sequelize';
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  if (user.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }
});
User.prototype.usernameExists = async function (username) {
  const result = await this.constructor.findOne({where: { username: username }});
  return !!result;
};

User.prototype.isCorrectPassword = async function (password) {
  const same = await bcrypt.compare(password, this.password);
  return same;
};

User.prototype.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

User.prototype.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));

  console.error("refreshToken", refreshToken);

  try {
    // Guardar el token en tu base de datos MySQL aquí
    // Puedes utilizar UserTokens.create({ token: refreshToken });
    console.log("Token saved", refreshToken);
    return refreshToken;
  } catch (error) {
    console.error(error);
    // throw new Error("Error creating token");
  }
};

export default User;
