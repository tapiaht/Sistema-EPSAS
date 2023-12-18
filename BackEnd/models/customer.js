import { Model, DataTypes } from 'sequelize';
import sequelize from "../utils/db.js";
export default class Customer extends Model {
  static associate(models) {
    // define association here
  }
}

Customer.init({
  nombres: DataTypes.STRING,
  apellidos: DataTypes.STRING,
  carnet: DataTypes.STRING,
  celular: DataTypes.STRING,
  direccion: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Customer',
});