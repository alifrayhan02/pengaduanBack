'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masyarakat extends Model {
    
  };
  masyarakat.init({
    nik:{
      type: DataTypes.CHAR,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masyarakat',
    tableName: 'masyarakat'
  });
  return masyarakat;
};