import { Model, DataTypes } from 'sequelize';
import sequelize from "../utils/db.js";
export default class Employee extends Model {
  static associate(models) {
    // define association here
  }
}

Employee.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  address: DataTypes.STRING,
  salary: DataTypes.DECIMAL,
  image: DataTypes.STRING,
  category_id: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Employee',
});