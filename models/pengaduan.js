'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pengaduan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  pengaduan.init({
    id_pengaduan: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nik: DataTypes.STRING,
    pelapor: DataTypes.STRING,
    isi_laporan: DataTypes.TEXT,
    status: DataTypes.STRING,
    
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pengaduan',
    tableName: "pengaduan"
  });

  pengaduan.associate = (models) => {
  pengaduan.hasMany(models.tanggapan,{foreignKey: "id_pengaduan", as: "tanggapan"})}

  return pengaduan;
};