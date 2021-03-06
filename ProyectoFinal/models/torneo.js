'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class torneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  torneo.init({
    nombre: DataTypes.STRING,
    fechainicio: DataTypes.DATE,
    fechafin: DataTypes.DATE,
    descripcion: DataTypes.STRING,
    tipo: DataTypes.STRING,
    estado: DataTypes.STRING,
    maximoparticipante: DataTypes.INTEGER,
    organizadorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'torneo',
  });
  return torneo;
};