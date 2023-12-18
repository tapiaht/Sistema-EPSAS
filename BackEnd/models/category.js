// category.model.mjs
import { Model, DataTypes } from 'sequelize';
import sequelize from "../utils/db.js";
export default class Category extends Model {
  static associate(models) {
    
  }
}

Category.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Category',
  }
);
